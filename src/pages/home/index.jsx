import { useContext } from "react";
import { AuthContext, ForyouTabContext } from "../../context/AuthContext";
import LeftSidebar from "../../components/homecomp/LeftSidebar";
import RightSidebar from "../../components/homecomp/RightSidebar";
import HomeHeader from "../../components/homecomp/HomeHeader";
import HomeFooter from "../../components/homecomp/HomeFooter";
import ForyouTab from "../../components/homecomp/ForyouTab";
import ComposeBox from "../../components/homecomp/ComposeBox";
import TweetLink from "../../components/TweetLink";
import SuspenseFeed from "../../components/SuspenseFeed";
import SuspenseFollowingFeed from "../../components/SuspenseFollowingFeed";

// One responsive layout: sidebars appear from md/lg up, mobile gets a top bar,
// a floating compose button and the fixed bottom nav.
export default function Home() {
  const { tab } = useContext(ForyouTabContext);
  const { showTweetModal } = useContext(AuthContext);

  return (
    <div
      className={`flex justify-center ${showTweetModal ? "bg-modal-bg" : ""}`}
    >
      <div className="hidden md:block">
        <LeftSidebar page="home" />
      </div>

      <div className="w-full md:w-[37.5rem] h-screen px-[0.0625rem] flex flex-col overflow-y-auto no-scrollbar pb-16 md:pb-0">
        <HomeHeader />
        <div className="hidden md:flex p-4 border-b border-b-neutral-700">
          <p className="text-neutral-50 font-Inter text-[1.1875rem] font-bold">
            Home
          </p>
        </div>
        <ForyouTab />
        <div className="hidden md:block">
          <ComposeBox />
        </div>
        <div className={`${!tab ? "hidden" : "block"}`}>
          <SuspenseFeed />
        </div>
        <div className={`${tab ? "hidden" : "block"}`}>
          <SuspenseFollowingFeed />
        </div>
      </div>

      <div className="hidden lg:block">
        <RightSidebar />
      </div>

      <div className="md:hidden">
        <TweetLink />
        <HomeFooter page="home" />
      </div>
    </div>
  );
}
