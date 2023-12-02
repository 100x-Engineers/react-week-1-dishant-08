import TweetLink from "../../components/TweetLink";
import Tweet from "../../components/Tweet";
import HomeHeader from "../../components/homecomp/HomeHeader";
import HomeFooter from "../../components/homecomp/HomeFooter";
import { useEffect, useState, useContext } from "react";
import DesktopPage from "./desktopPage";
import { AuthContext } from "../../context/AuthContext";

export function MobilePage() {
  return (
    <>
      <HomeHeader />
      <Tweet />
      <TweetLink />
      <HomeFooter page="home" />
    </>
  );
}

export default function Home() {
  const { showTweetModal } = useContext(AuthContext);
  // const [desktopMode, setDesktopMode] = useState(false);

  // const checkScreenSize = () => {
  //   console.log(window.innerWidth);
  //   setDesktopMode(window.innerWidth > 768);
  // };

  // useEffect(() => {
  //   window.addEventListener("resize", checkScreenSize);
  //   return () => {
  //     window.removeEventListener("resize", checkScreenSize);
  //   };
  // }, []);

  return (
    <>
      <div className={` hidden md:block ${showTweetModal && "bg-modal-bg"} `}>
        <DesktopPage />
      </div>
      <div className=" md:hidden ">
        <MobilePage />
      </div>
    </>
  );
}
