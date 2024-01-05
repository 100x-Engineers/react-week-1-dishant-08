// Import statements
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Logo100 from "../../assets/copy-link-100.svg";
import HomeInactive from "../../assets/state-not-selectedhome-icon.svg";
import HomeActive from "../../assets/homeActive.svg";
import IconActive from "../../assets/IconActive.svg";
import IconInactive from "../../assets/menu-item-group.svg";
import Logox from "../../assets/copy-link-group-27162.svg";
import Button from "../button";
import userAvatar from "../../assets/user-avatar.png";
import ThreeDot from "../../assets/dark-theme-ellipses-group.svg";
import { createPortal } from "react-dom";
import TweetModal from "../modal/tweetModal"; // Removed .jsx extension
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { convertBufferToDataURL } from "../../constants";

export function DesktopHome({ page, oncurrentLogUserChange }) {
  const { currentLogUser, setcurrentLogUser } = useContext(AuthContext);

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(
        "https://one00xapi.onrender.com/api/curuser",
        {
          withCredentials: true,
        }
      );
      const data = await response.data;
      setcurrentLogUser(data);
      oncurrentLogUserChange(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <>
      <div>
        <Link to={"/home"} className="flex py-3 px-5 gap-5 ">
          <img src={page === "home" ? HomeActive : HomeInactive} alt="Home" />
          <p className="text-neutral-50 font-Inter text-[1.1875rem] font-medium">
            Home
          </p>
        </Link>
      </div>
      <div>
        <Link
          to={`/user/${currentLogUser?.currUser}`}
          className="flex py-3 px-5 gap-5 "
        >
          <img
            src={page === "user" ? IconActive : IconInactive}
            alt="Profile"
          />
          <p className="text-neutral-50 font-Inter text-[1.1875rem] font-medium">
            Profile
          </p>
        </Link>
      </div>
    </>
  );
}

export default function LeftSidebar({ page }) {
  const { showTweetModal, SetShowTweetModal, currentLogUser } =
    useContext(AuthContext);

  const [currUser, SetCurrUser] = useState();

  function SettingUser(data) {
    SetCurrUser(data);
    console.log(data);
  }

  return (
    <div className="flex p-5 flex-col h-screen justify-between border-r border-r-neutral-700">
      <div className="flex flex-col gap-2">
        <div className="py-3 px-5 flex justify-start gap-2.5 self-stretch">
          <div className="flex justify-center items-end gap-0.5">
            <img src={Logo100} alt="Logo 100" />
            <img src={Logox} alt="X" />
          </div>
        </div>
        <DesktopHome page={page} oncurrentLogUserChange={SettingUser} />
        <div className="p-2.5">
          <div className="py-tx">
            <Button
              variant="solidBlue"
              type="medium"
              onClick={() => SetShowTweetModal(true)}
            >
              Post
            </Button>
            {showTweetModal &&
              createPortal(<TweetModal />, document.getElementById("portal"))}
          </div>
        </div>
      </div>
      <footer>
        <div className="flex justify-between items-center self-stretch">
          <Link to={`/user/${currUser?.currUser}`}>
            <div
              className="flex items-start gap-3"
              onClick={() => {
                console.log("Link clicked");
                Setrender(!render);
              }}
            >
              {!!currUser?.dp?.data ? (
                <img
                  src={convertBufferToDataURL(currUser?.dp?.data)}
                  alt="user-avatar"
                  className="w-12 rounded-full h-12"
                />
              ) : (
                <img
                  src={userAvatar}
                  alt="user-avatar"
                  className="w-12  rounded-full h-12"
                />
              )}
              <div className="flex flex-col items-start">
                <p className="text-neutral-50 font-Inter text-fx font-bold">
                  {currUser?.disName}
                </p>
                <p className="text-neutral-500 font-Inter text-fx">
                  @{currUser?.currUser}
                </p>
              </div>
            </div>
          </Link>

          <div className="flex justify-center items-center w-[2.0625rem] h-[2.0625rem] px-[0.49413rem]">
            <img src={ThreeDot} alt="Three Dot" />
          </div>
        </div>
      </footer>
    </div>
  );
}
