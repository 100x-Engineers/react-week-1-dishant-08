import TweetLink from "../../components/TweetLink";
import HomeHeader from "../../components/homecomp/HomeHeader";
import HomeFooter from "../../components/homecomp/HomeFooter";
import { useEffect, useState, useContext } from "react";
import DesktopPage from "./desktopPage";
import { AuthContext, ForyouTabContext } from "../../context/AuthContext";

export function MobilePage() {
  window.scrollTo(0, 0);
  const { tab } = useContext(ForyouTabContext);

  return (
    <>
      <HomeHeader />
      <TweetLink />
      <div className="sticky bottom-0 z-50">
        <HomeFooter page="home" />
      </div>
    </>
  );
}

export default function Home() {
  const { showTweetModal } = useContext(AuthContext);
  // const [desktopMode, setDesktopMode] = useState(false);

  // const checkScreenSize = () => {
  //   console.log(window.innerWidth);
  //   setDesktopMode(window.innerWidth > 768);
  // };kn

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
