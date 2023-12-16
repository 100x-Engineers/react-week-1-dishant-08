import camera from "../../assets/material-symbols-add-a-photo-outline.svg";
import cancel from "../../assets/create-account-1-signup-x.svg";
import Input from "../input";
import PropTypes from "prop-types"; // ES6
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import EditHeader from "./EditHeader";

import * as yup from "yup";
import axios from "axios";

EditMain.propTypes = {
  // display_name: PropTypes.string.isRequired,
  // userFullname: PropTypes.string,
  // bio: PropTypes.string,
  userImage: PropTypes.string.isRequired,
  UserBackground: PropTypes.string.isRequired,
  // bioLink: PropTypes.string,
};

const editUserSchema = yup.object().shape({
  display_name: yup
    .string()
    .required("display_name is Required")
    .min(2)
    .max(12),
  // bio: userData.bio,
  location: yup.string(),
  website: yup.string(),
  // website: userData.website,
});

export default function EditMain({ userImage, UserBackground }) {
  const { formData, setFormData } = useContext(AuthContext);
  const { showEditModal, SetShowEditModal } = useContext(AuthContext);

  const [user, setUser] = useState();
  const [inputValues, setInputValues] = useState({
    display_name: "",
    bio: "",
    location: "",
    website: "",
  });
  const [error, SetError] = useState("");

  const getUserData = async () => {
    try {
      const response = await axios.get(
        "https://one00xapi.onrender.com/api/geteditcuruser",
        {
          withCredentials: true,
        }
      );
      setUser(response.data?.user || {});
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
              console.log("Validation Sucessful");
            })
            .catch((error) => {
              SetError(error);
              console.log(error.message);
            });

          try {
            const response = await axios.put(
              "https://one00xapi.onrender.com/api/editUser",
              {
                display_name: inputValues.display_name,
                bio: inputValues.bio,
                location: inputValues.location,
                website: inputValues.website,
              },
              {
                withCredentials: true,
              }
            );
            SetShowEditModal(false);
            window.location.reload(false);
            console.log("API response:", response.data);
          } catch (error) {
            console.error("API error:", error);
          }

          console.log("Submitted values", inputValues);
        }}
      >
        <EditHeader />

        <main>
          <div className="flex  justify-center items-center relative">
            <img className="  w-full  " src={UserBackground} alt="bg-image" />
            <div className="flex p-1 justify-center items-center absolute bg-edit-svg rounded-full  ">
              <img className="w-6 h-6" src={camera} alt="camera icon" />
            </div>

            <button onClick={() => SetShowEditModal(false)}>
              <img
                className="absolute top-1/2  left-[60%] -translate-x-1/2 -translate-y-1/2     bg-edit-svg  p-1 rounded-full flex  items-center z-40"
                src={cancel}
                alt="cross-button "
              />{" "}
            </button>
            <img
              className=" absolute -bottom-4 left-3 border-4 rounded-[12.5rem]  border-neutral-1000 w-[4.25rem] h-[4.25rem] "
              src={userImage}
              alt="user-avatar"
            />
          </div>

          <div className=" mt-6 flex flex-col px-4 pb-2 items-start gap-5 self-stretch ">
            <Input
              name="display_name"
              placeholder="Name"
              show="true"
              // defaultValue={userFullname}
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
                // defaultValue={bio}
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
              // defaultValue={bioLink}
              value={inputValues.website}
              onChange={(e) => handleInputChange("website", e.target.value)}
            />
          </div>
        </main>
      </form>
    </>
  );
}
