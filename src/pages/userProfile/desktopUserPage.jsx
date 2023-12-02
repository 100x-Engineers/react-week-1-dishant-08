import Tweet from "../../components/Tweet";
import HomeHeader, { ForyouTab } from "../../components/homecomp/HomeHeader";
import LeftSidebar from "../../components/homecomp/LeftSidebar";
import RightSidebar from "../../components/homecomp/RightSidebar";
// import userAvatar from "../../assets/user-avatar.png";
import Button from "../../components/button";
import UserHeader from "../../components/userProfile/UserHeader";
import bgImage from "../../assets/bgimage.png";
import userAvatar from "../../assets/user-avatar.png";
import TweetLink from "../../components/TweetLink";
// import Tweet from "../../components/Tweet";
import HomeFooter from "../../components/homecomp/HomeFooter";
import { MobileUserPage } from ".";
export default function DesktopUserPage() {
  return (
    <div className="flex justify-center ">
      <div className="flex ">
        <LeftSidebar />
        <div className="w-[37.5rem] h-screen px-[0.0625rem] flex flex-col overflow-y-auto no-scrollbar ">
          <MobileUserPage />
        </div>
        <RightSidebar />
      </div>
    </div>
  );
}
