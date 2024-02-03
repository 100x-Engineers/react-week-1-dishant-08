import { Link } from "react-router-dom";
import Logo from "../../assets/100x-Logo.svg";
import userAvatar from "../../assets/user-avatar.png";
import { useContext, useState } from "react";
import { AuthContext, ForyouTabContext } from "../../context/AuthContext";
import { convertBufferToDataURL } from "../../constants";
import Tweet from "../../components/Tweet";
import FollowingTweet from "../../components/FollowingTweet";
import ForyouTab from "./ForyouTab";

export default function HomeHeader() {
  const { currentLogUser, setcurrentLogUser } = useContext(AuthContext);
  const { tab, setTab } = useContext(ForyouTabContext);

  return (
    <>
      <header className=" flex   flex-col items-start shrink-0  rounded-2xl">
        <div className=" flex py-5 px-4 justify-center  w-full   border-b border-b-neutral-700">
          <Link to={`/user/${currentLogUser?.currUser}`}>
            {!!currentLogUser?.dp?.data ? (
              <img
                src={convertBufferToDataURL(currentLogUser?.dp?.data)}
                alt="user-avatar"
                className=" absolute rounded-full w-12 h-12 left-4 top-2 "
              />
            ) : (
              <img
                src={userAvatar}
                alt="user-avatar"
                className=" absolute left-4 top-2 "
              />
            )}
            {/* <img
              className=" absolute left-4 top-2 "
              src={userAvatar}
              alt=" user-avatar"
            /> */}
          </Link>

          <img
            className=" justify-center self-center "
            src={Logo}
            alt="100x-logo"
          />
        </div>
        <main className="w-screen">
          {/* for you */}
          <ForyouTab />
        </main>
      </header>
      <div className={` ${!tab ? "hidden" : "block"} `}>
        <Tweet />
      </div>
      <div className={` ${tab ? "hidden" : "block"} `}>
        <FollowingTweet />
      </div>
    </>
  );
}
