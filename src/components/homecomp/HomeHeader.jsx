import { Link } from "react-router-dom";
import Logo from "../../assets/100x-Logo.svg";
import userAvatar from "../../assets/user-avatar.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export function ForyouTab() {
  const [tab, setTab] = useState(true);

  return (
    <div className=" flex pt-5 px-20  pb-0 justify-center items-center gap-40  border-b  border-b-neutral-700 self-stretch ">
      <button
        className={` flex flex-col justify-center items-center gap-4   shrink-0 border-transparent ${
          tab ? "border-twitter-blue border-b-4" : " "
        }`}
        onClick={() => setTab(true)}
      >
        <span
          className={`font-Inter  text-fx text-neutral-50 font-semibold pb-2  ${
            tab ? " text-neutral-400 " : " "
          } `}
        >
          For you
        </span>
      </button>
      <button
        className={` flex flex-col justify-center items-center gap-4   shrink-0 border-transparent ${
          tab ? " " : "border-twitter-blue border-b-4"
        }`}
        onClick={() => setTab(false)}
      >
        <span
          className={`font-Inter  text-fx text-neutral-50 font-semibold pb-2  ${
            tab ? " " : " text-neutral-400 "
          } `}
        >
          Following
        </span>
      </button>
    </div>
  );
}

export default function HomeHeader() {
  const { currentLogUser, setcurrentLogUser } = useContext(AuthContext);

  return (
    <>
      <header className=" flex   flex-col items-start shrink-0  rounded-2xl">
        <div className=" flex py-5 px-4 justify-center  w-full   border-b border-b-neutral-700">
          <Link to={`/user/${currentLogUser?.currUser}`}>
            <img
              className=" absolute left-4 top-2 "
              src={userAvatar}
              alt=" user-avatar"
            />
          </Link>

          <img
            className=" justify-center self-center "
            src={Logo}
            alt="100x-logo"
          />
        </div>
        <main className="w-screen">
          {/* for you */}
          <ForyouTab />
        </main>
      </header>
    </>
  );
}
