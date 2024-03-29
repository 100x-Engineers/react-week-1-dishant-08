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
import { useMediaQuery } from "react-responsive";
import UserTweet from "../../components/UserTweet";

export function MobileUserPage({ children }) {
  window.scrollTo(0, 0);
  return (
    <>
      {children}
      <TweetLink />
      {/* <Tweet /> */}
      <div className="fixed bottom-0 z-50">
        <HomeFooter page="user" />
      </div>
    </>
  );
}

export default function User() {
  const [User, SetUser] = useState();
  const [data, SetData] = useState();
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
      SetData(data);
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
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  const { showEditModal, SetShowEditModal } = useContext(AuthContext);
  return (
    <>
      <div
        className={`${isDesktop && "hidden md:block"} ${
          isDesktop && showEditModal && "bg-modal-bg"
        }`}
      >
        {isDesktop ? (
          <DesktopUserPage>
            <UserHeader
              userName={User?.username}
              userFullname={User?.display_name}
              bio={User?.bio}
              userId={User?.id}
              // bio="   Digital Goodies Team - Web & Mobile UI/UX development; Graphics; Illustrations "
              userImage={User?.profile_picture}
              UserBackground={User?.cover_picture}
              following={data?.following}
              followers={data?.follower}
              bioLink={User?.website}
              joinedAt={timeStamp}
            />
            <UserTweet userId={User?.id} />
          </DesktopUserPage>
        ) : (
          <MobileUserPage>
            <UserHeader
              userName={User?.username}
              userFullname={User?.display_name}
              bio={User?.bio}
              userId={User?.id}
              // bio="   Digital Goodies Team - Web & Mobile UI/UX development; Graphics; Illustrations "
              userImage={User?.profile_picture}
              UserBackground={User?.cover_picture}
              following={data?.following}
              followers={data?.follower}
              bioLink={User?.website}
              joinedAt={timeStamp}
            />
            <UserTweet userId={User?.id} />
          </MobileUserPage>
        )}
      </div>
    </>
  );
}
