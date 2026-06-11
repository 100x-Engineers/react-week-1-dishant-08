import camera from "../../assets/material-symbols-add-a-photo-outline.svg";
import cancel from "../../assets/create-account-1-signup-x.svg";
import Input from "../input";
import PropTypes from "prop-types"; // ES6
import { useContext, useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext";
import EditHeader from "./EditHeader";

import * as yup from "yup";
import axios from "axios";

EditMain.propTypes = {
  userImage: PropTypes.string.isRequired,
  UserBackground: PropTypes.string.isRequired,
};

const editUserSchema = yup.object().shape({
  display_name: yup
    .string()
    .required("display_name is Required")
    .min(2)
    .max(12),
  location: yup.string(),
  website: yup.string(),
});

export default function EditMain({ userImage, UserBackground }) {
  const { SetShowEditModal } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const [user, setUser] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [inputValues, setInputValues] = useState({
    display_name: "",
    bio: "",
    location: "",
    website: "",
  });
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);

  // Local object URLs give an instant preview before anything is uploaded.
  const profilePreview = useMemo(
    () => (profileFile ? URL.createObjectURL(profileFile) : null),
    [profileFile]
  );
  const coverPreview = useMemo(
    () => (coverFile ? URL.createObjectURL(coverFile) : null),
    [coverFile]
  );
  useEffect(
    () => () => profilePreview && URL.revokeObjectURL(profilePreview),
    [profilePreview]
  );
  useEffect(
    () => () => coverPreview && URL.revokeObjectURL(coverPreview),
    [coverPreview]
  );

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/geteditcuruser`,
          { withCredentials: true }
        );
        setUser(response.data?.user || {});
      } catch (err) {
        console.error("Error fetching User Details:", err.message);
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    setInputValues((prevValues) => ({
      ...prevValues,
      display_name: user?.display_name || "",
      bio: user?.bio || "",
      location: user?.location || "",
      website: user?.website || "",
    }));
  }, [user]);

  const handleInputChange = (field, value) => {
    setInputValues((prevValues) => ({ ...prevValues, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSaving) return;

    try {
      await editUserSchema.validate(inputValues);
      setError("");
    } catch (validationError) {
      setError(validationError.message);
      return;
    }

    const formData = new FormData();
    formData.append("display_name", inputValues.display_name);
    formData.append("bio", inputValues.bio);
    formData.append("location", inputValues.location);
    formData.append("website", inputValues.website);
    if (profileFile) formData.append("profile_picture", profileFile);
    if (coverFile) formData.append("cover_picture", coverFile);

    setIsSaving(true);
    setUploadProgress(0);
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/editUser`,
        formData,
        {
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              setUploadProgress(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              );
            }
          },
        }
      );

      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      queryClient.invalidateQueries({ queryKey: ["followingFeed"] });
      SetShowEditModal(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update profile");
    } finally {
      setIsSaving(false);
      setUploadProgress(null);
    }
  };

  const coverSrc = coverPreview || user?.cover_picture || UserBackground;
  const profileSrc = profilePreview || user?.profile_picture || userImage;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <EditHeader isSaving={isSaving} />

        <main>
          <div className="flex  justify-center items-center relative">
            <img
              className=" w-[350px] h-[200px] object-cover"
              src={coverSrc}
              alt="cover"
            />
            <div className="flex p-1 justify-center items-center absolute bg-edit-svg rounded-full  ">
              <label htmlFor="bgimage">
                <img className="w-6 h-6" src={camera} alt="camera icon" />
              </label>
              <input
                className="hidden"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                name="cover_picture"
                id="bgimage"
                onChange={(e) => setCoverFile(e.target.files[0] || null)}
              />
            </div>
            <button type="button" onClick={() => setCoverFile(null)}>
              <img
                className="absolute top-1/2  left-[60%] -translate-x-1/2 -translate-y-1/2     bg-edit-svg  p-1 rounded-full flex  items-center z-40"
                src={cancel}
                alt="cross-button "
              />{" "}
            </button>
            <div className="absolute -bottom-5 left-3 ">
              <div className="relative">
                <img
                  className="  border-4 rounded-[12.5rem]  border-neutral-1000 w-[4.25rem] h-[4.25rem] object-cover"
                  src={profileSrc}
                  alt="user-avatar"
                />
                <label htmlFor="proimage">
                  <img
                    className="w-6 h-6 absolute bottom-5 left-5 p-1 bg-edit-svg rounded-full  "
                    src={camera}
                    alt="camera icon"
                  />
                </label>
                <input
                  className="hidden"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  name="profile_picture"
                  id="proimage"
                  onChange={(e) => setProfileFile(e.target.files[0] || null)}
                />
              </div>
            </div>
          </div>

          {isSaving && uploadProgress !== null && (
            <div className="mt-8 px-4">
              <div className="h-1 w-full rounded bg-neutral-700">
                <div
                  className="h-1 rounded bg-twitter-blue transition-all"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-neutral-500 font-Inter text-xs mt-1">
                Uploading… {uploadProgress}%
              </p>
            </div>
          )}

          <div className=" mt-6 flex flex-col px-4 pb-2 items-start gap-5 self-stretch ">
            <Input
              name="display_name"
              placeholder="Name"
              show="true"
              value={inputValues.display_name}
              onChange={(e) =>
                handleInputChange("display_name", e.target.value)
              }
            />
            <div className="text-red-600  ">{error && <span>{error}</span>}</div>
            <fieldset className="flex  group w-full self-stretch py-4 px-3 items-center  rounded border  focus-within:border-twitter-blue justify-between grow">
              <legend className="group-focus-within:text-twitter-blue text-neutral-500 font-Inter text-[0.75rem]  font-medium px-1 ">
                Bio
              </legend>
              <textarea
                cols={30}
                rows={4}
                name="bio"
                className="bg-inherit  w-full h-full  caret-twitter-blue focus:outline-none resize-none
      rounded-md placeholder-neutral-500 text-base text-neutral-50"
                placeholder="Bio"
                value={inputValues.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
              />
            </fieldset>
            <Input
              name="location"
              placeholder="Location"
              show="true"
              value={inputValues.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
            />{" "}
            <Input
              name="website"
              placeholder="Website"
              show="true"
              value={inputValues.website}
              onChange={(e) => handleInputChange("website", e.target.value)}
            />
          </div>
        </main>
      </form>
    </>
  );
}
