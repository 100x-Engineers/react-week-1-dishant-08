export const TweetList = [
  {
    id: 1,
    userId: 42,
    content: "JUst do it , achieve it",
    posted_at: 134364877.808,
  },
  {
    id: 2,
    userId: 42,
    content: "JUst do it ",
    postedAt: 134364877.808,
  },
  {
    id: 3,
    userId: 42,
    content: "JUst do it ",
    postedAt: 134364877.808,
  },
  {
    id: 4,
    userId: 42,
    content: "JUst do it ",
    postedAt: 134364877.808,
  },
  {
    id: 6,
    userId: 42,
    content: "JUst do it ",
    postedAt: 134364877.808,
  },
  {
    id: 7,
    userId: 42,
    content: "JUst do it ",
    postedAt: 134364877.808,
  },
  {
    id: 8,
    userId: 42,
    content: "JUst do it ",
    postedAt: 134364877.808,
  },
];

export const convertFileToBuffer = async (file) => {
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

// Function to handle file upload
export const handleFileUpload = async (file, fieldName) => {
  try {
    const buffer = await convertFileToBuffer(file);
    // Handle the buffer, e.g., send it to the server
    console.log(`Converted ${fieldName} buffer:`, buffer);
    // You can perform specific actions based on the field name (profile_picture or cover_picture)
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
