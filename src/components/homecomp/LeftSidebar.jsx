import Logo from "../../assets/100x-Logo.svg";
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

function DesktopHome({ page }) {
  return (
    <>
      <div>
        <Link to={"/home"} className="flex py-3 px-5 gap-5 ">
          <img src={page === "home" ? HomeActive : HomeInactive} />
          <p className=" text-neutral-50 font-Inter text-[1.1875rem] font-medium  ">
            Home
          </p>
        </Link>
      </div>
      <div>
        <Link to={"/user"} className="flex py-3 px-5 gap-5 ">
          <img src={page === "user" ? IconActive : IconInactive} />
          <p className=" text-neutral-50 font-Inter text-[1.1875rem] font-medium  ">
            Profile
          </p>
        </Link>
      </div>
    </>
  );
}

export default function LeftSidebar() {
  return (
    <div className="flex p-5 flex-col h-screen justify-between  border-r border-r-neutral-700 ">
      <div className="flex flex-col gap-2">
        <div className=" py-3 px-5 flex justify-start gap-2.5 self-stretch   ">
          <div className="flex justify-center items-end gap-0.5 ">
            <img src={Logo100} alt="100" />
            <img src={Logox} alt="x" />
          </div>
        </div>
        <DesktopHome page="home" />
        <div className="p-2.5 ">
          <div className="py-tx ">
            <Button variant="solidBlue" type="medium">
              Post
            </Button>
          </div>
        </div>
      </div>
      <footer>
        <div className="flex justify-between items-center self-stretch">
          <div className="flex items-start gap-3">
            <img src={userAvatar} alt="userAvatar" />
            <div className="flex flex-col items-start">
              <p className="text-neutral-50 font-Inter text-fx font-bold ">
                aarushe_reddy
              </p>
              <p className="text-neutral-500 font-Inter text-fx  ">
                @aarushe_reddy
              </p>
            </div>
          </div>
          <div className=" flex justify-center items-center w-[2.0625rem] h-[2.0625rem] px-[0.49413rem] ">
            <img src={ThreeDot} alt="ThreeDot" />
          </div>
        </div>
      </footer>
    </div>
  );
}
