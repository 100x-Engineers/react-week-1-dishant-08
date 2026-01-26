import camera from "../../assets/material-symbols-add-a-photo-outline.svg";
import cancel from "../../assets/create-account-1-signup-x.svg";
import Input from "../input";
import PropTypes from "prop-types"; // ES6
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import EditHeader from "./EditHeader";

import * as yup from "yup";
import axios from "axios";
import { convertBufferToDataURL, handleFileUpload } from "../../constants";

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
  const { formData, setFormData } = useContext(AuthContext);
  const { showEditModal, SetShowEditModal } = useContext(AuthContext);
  const [profileBuffer, setProfileBuffer] = useState();
  const [coverBuffer, setCoverBuffer] = useState();
  const [isbgImage, setIsbgImage] = useState(false);
  const [isproImage, setIsproImage] = useState(false);

  const [user, setUser] = useState();
  const [inputValues, setInputValues] = useState({
    display_name: "",
    bio: "",
    location: "",
    website: "",
  });
  const [error, SetError] = useState("");
  const { render, Setrender } = useContext(AuthContext);

  const getUserData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/geteditcuruser`,
        {
          withCredentials: true,
        }
      );
      setUser(response.data?.user || {});
      setCoverBuffer(response.data?.user?.cover_picture?.data);
      setProfileBuffer(response.data?.user?.profile_picture?.data);
    } catch (error) {
      console.error("Error fetching User Details:", error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    // Update inputValues when user changes
    setInputValues((prevValues) => ({
      ...prevValues,
      display_name: user?.display_name || "",
      bio: user?.bio || "",
      location: user?.location || "",
      website: user?.website || "",
    }));
  }, [user]);

  const handleInputChange = (field, value) => {
    setInputValues((prevValues) => {
      const updatedValues = {
        ...prevValues,
        [field]: value,
      };

      return updatedValues;
    });
  };

  const handlebgImage = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const buffer = await handleFileUpload(file, "cover_picture");
        setCoverBuffer(buffer);
        setIsbgImage(true);
      } catch (error) {
        console.error("Error handling profile image:", error);
      }
    }
  };

  const handleProImage = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const buffer = await handleFileUpload(file, "profile_picture");
        setProfileBuffer(buffer);
        setIsproImage(true);
      } catch (error) {
        console.error("Error handling cover image:", error);
      }
    }
  };

  const [imgdata, setData] = useState();
  useEffect(() => {
    setData(convertBufferToDataURL(coverBuffer));
  }, [coverBuffer]);
  const [imgProData, setProData] = useState();
  useEffect(() => {
    setProData(convertBufferToDataURL(profileBuffer));
  }, [profileBuffer]);

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setFormData(inputValues);
          editUserSchema
            .validate(inputValues)
            .then(() => {
              SetError("");
            })
            .catch((error) => {
              SetError(error);
            });

          try {
            const formData = new FormData();
            formData.append("display_name", inputValues.display_name);
            formData.append("bio", inputValues.bio);
            formData.append("location", inputValues.location);
            formData.append("website", inputValues.website);

            if (isproImage) {
              formData.append(
                "profile_picture",
                new Blob([profileBuffer]),
                "profile.jpg"
              );
            }

            if (isbgImage) {
              formData.append(
                "cover_picture",
                new Blob([coverBuffer]),
                "cover.jpg"
              );
            }

            const response = await axios.put(
              `${import.meta.env.VITE_API_BASE_URL}/api/editUser`,
              formData,
              {
                withCredentials: true,
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );

            SetShowEditModal(false);
            Setrender(!render);
          } catch (error) {
            console.error("API error:", error);
          }
        }}
      >
        <EditHeader />

        <main>
          <div className="flex  justify-center items-center relative">
            {coverBuffer ? (
              <img
                className=" w-[350px] h-[200px]"
                src={imgdata}
                alt="User Image"
                onError={(e) => console.error("Image error:", e)}
              />
            ) : (
              <img
                className="w-[350px] h-[200px]"
                src={UserBackground}
                alt="bg-image"
              />
            )}
            <div className="flex p-1 justify-center items-center absolute bg-edit-svg rounded-full  ">
              <label htmlFor="bgimage">
                <img className="w-6 h-6" src={camera} alt="camera icon" />
              </label>
              <input
                className="hidden"
                type="file"
                name="bgimage"
                id="bgimage"
                onChange={handlebgImage}
              />
            </div>
            <button type="button" onClick={() => setCoverBuffer("")}>
              <img
                className="absolute top-1/2  left-[60%] -translate-x-1/2 -translate-y-1/2     bg-edit-svg  p-1 rounded-full flex  items-center z-40"
                src={cancel}
                alt="cross-button "
              />{" "}
            </button>
            <div className="absolute -bottom-5 left-3 ">
              <div className="relative">
                {profileBuffer ? (
                  <img
                    className="  border-4 rounded-[12.5rem]  border-neutral-1000 w-[4.25rem] h-[4.25rem] "
                    src={imgProData}
                    alt="user-avatar"
                  />
                ) : (
                  <img
                    className="  border-4 rounded-[12.5rem]  border-neutral-1000 w-[4.25rem] h-[4.25rem] "
                    src={userImage}
                    alt="user-avatar"
                  />
                )}
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
                  name="bgimage"
                  id="proimage"
                  onChange={handleProImage}
                />
              </div>
            </div>
          </div>

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
            <div className="text-red-600  ">
              {error && <span>{error.message}</span>}
            </div>
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
