import HomeInactive from "../../assets/state-not-selectedhome-icon.svg";
import HomeActive from "../../assets/homeActive.svg";
import IconActive from "../../assets/IconActive.svg";
import IconInactive from "../../assets/IconInactive.svg";
import { Link } from "react-router-dom";

export default function HomeFooter({ page }) {
  return (
    <>
      <footer className="flex flex-col justify-end flex-grow h-screen ">
        <div className=" flex py-[1.125rem] px-6 justify-center items-center gap-10 border-t border-neutral-800 bg-neutral-1000  ">
          <Link to={"/home"}>
            <img src={page === "home" ? HomeActive : HomeInactive} />
          </Link>
          <Link to={"/user"}>
            <img src={page === "user" ? IconActive : IconInactive} />
          </Link>
        </div>
      </footer>
    </>
  );
}
