const convertFileToBuffer = async (file) => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onloadend = () => {
      const base64Data = reader.result.split(";base64,").pop();
      const arrayBuffer = Uint8Array.from(atob(base64Data), (c) =>
        c.charCodeAt(0)
      ).buffer;
      const buffer = new Uint8Array(arrayBuffer);
      resolve(buffer);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export const handleFileUpload = async (file, fieldName) => {
  try {
    const buffer = await convertFileToBuffer(file);
    return buffer;
  } catch (error) {
    console.error(`Error converting ${fieldName} file to buffer:`, error);
    throw error;
  }
};

export const convertBufferToDataURL = (buffer) => {
  const uint8Array = new Uint8Array(buffer);
  const blob = new Blob([uint8Array], { type: "image/jpeg" }); // Adjust the type based on your image format
  const dataURL = URL.createObjectURL(blob);

  return dataURL;
};
