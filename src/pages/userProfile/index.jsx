import UserHeader from "../../components/userProfile/UserHeader";
import bgImage from "../../assets/bgimage.png";
import userAvatar from "../../assets/user-avatar.png";
import TweetLink from "../../components/TweetLink";
import Tweet from "../../components/Tweet";
import HomeFooter from "../../components/homecomp/HomeFooter";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import DesktopUserPage from "./desktopUserPage.jsx";

export function MobileUserPage() {
  return (
    <>
      <UserHeader
        userName=" @dishant_sahu "
        userFullname=" Dishant sahu"
        bio="   Digital Goodies Team - Web & Mobile UI/UX development; Graphics; Illustrations "
        userImage={userAvatar}
        UserBackground={bgImage}
        following=" 217"
        followers="118 "
        bioLink="pixsellz.io "
        joinedAt="  Joined September 2018"
      />

      <TweetLink />
      <Tweet />

      <HomeFooter page="user" />
    </>
  );
}

export default function User() {
  const { showEditModal, SetShowEditModal } = useContext(AuthContext);
  return (
    <>
      <div className={` hidden md:block ${showEditModal && "bg-modal-bg"} `}>
        <DesktopUserPage />
      </div>
      <div className=" md:hidden ">
        <MobileUserPage />
      </div>
    </>
  );
}

/*
  const [desktopMode, setDesktopMode] = useState(false);

  const checkScreenSize = () => {
    console.log(window.innerWidth);
    setDesktopMode(window.innerWidth > 768);
  };

  useEffect(() => {
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);
  return (
    <>
      {desktopMode ? (
        <div className={` ${showEditModal && "bg-modal-bg"} `}>
          <DesktopUserPage />
        </div>
      ) : (
        <MobileUserPage />
      )}
    </>
  );

*/
