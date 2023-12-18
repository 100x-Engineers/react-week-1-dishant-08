import UserHeader from "../../components/userProfile/UserHeader";
import bgImage from "../../assets/bgimage.png";
import userAvatar from "../../assets/user-avatar.png";
import TweetLink from "../../components/TweetLink";
import Tweet from "../../components/Tweet";
import HomeFooter from "../../components/homecomp/HomeFooter";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import DesktopUserPage from "./desktopUserPage";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

export function MobileUserPage({ children }) {
  window.scrollTo(0, 0);
  return (
    <>
      {children}
      <TweetLink />
      <Tweet />

      <HomeFooter page="user" />
    </>
  );
}

export default function User() {
  const [User, SetUser] = useState();
  const userName = useParams();
  // console.log();
  const { render, Setrender } = useContext(AuthContext);

  const getUserDetails = async () => {
    try {
      const response = await axios.get(
        `https://one00xapi.onrender.com/api/getUser/${userName.userName}`,
        {
          withCredentials: true,
        }
      );
      // console.log(response);
      const data = response.data;
      SetUser(data.user);
      // console.log(User);
      // console.log(User.display_name);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  // joinedAt={}
  const timeStamp = "Joined" + " " + moment(User?.createdAt).fromNow();
  useEffect(() => {
    getUserDetails();
  }, []);
  useEffect(() => {
    getUserDetails();
  }, [render]);

  const { showEditModal, SetShowEditModal } = useContext(AuthContext);
  return (
    <>
      <div className={` hidden md:block ${showEditModal && "bg-modal-bg"} `}>
        <DesktopUserPage>
          {" "}
          <UserHeader
            userName={User?.username}
            userFullname={User?.display_name}
            bio={User?.bio}
            userId={User?.id}
            // bio="   Digital Goodies Team - Web & Mobile UI/UX development; Graphics; Illustrations "
            userImage={userAvatar ?? User?.profile_picture}
            UserBackground={bgImage}
            following=" 0"
            followers=" 1 "
            bioLink={User?.website}
            joinedAt={timeStamp}
          />
        </DesktopUserPage>
      </div>
      <div className=" md:hidden ">
        <MobileUserPage>
          <UserHeader
            userName={User?.username}
            userFullname={User?.display_name}
            bio={User?.bio}
            userId={User?.id}
            // bio="   Digital Goodies Team - Web & Mobile UI/UX development; Graphics; Illustrations "
            userImage={userAvatar ?? User?.profile_picture}
            UserBackground={bgImage}
            following=" 0"
            followers=" 1 "
            bioLink={User?.website}
            joinedAt={timeStamp}
          />
        </MobileUserPage>
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

*/
