import UserHeader from "../../components/userProfile/UserHeader";
import bgImage from "../../assets/bgimage.png";
import userAvatar from "../../assets/user-avatar.png";
import TweetLink from "../../components/TweetLink";
import Tweet from "../../components/Tweet";
import HomeFooter from "../../components/homecomp/HomeFooter";

export default function User() {
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
