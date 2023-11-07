import { Link } from "react-router-dom";
import Logo from "../../assets/100x-Logo.svg";
import userAvatar from "../../assets/user-avatar.png";

export default function HomeHeader() {
  return (
    <>
      <header className=" flex   flex-col items-start shrink-0  rounded-2xl">
        <div className=" flex py-5 px-4 justify-center  w-full   border-b border-b-neutral-700">
          <Link to={"/user"}>
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
        <main>
          {/* for you */}
          <div className=" flex pt-5 px-20  w-screen pb-0 justify-center items-center gap-40  border-b  border-b-neutral-700 self-stretch ">
            <button className=" flex flex-col justify-center items-center gap-4  group  border-b-4 shrink-0 border-transparent focus:border-twitter-blue">
              <span className=" font-Inter  text-fx text-neutral-50 font-medium group-focus:text-neutral-400 pb-2 ">
                For you
              </span>
            </button>
            <button className=" flex flex-col justify-center items-center gap-4  group  border-b-4  border-transparent focus:border-twitter-blue">
              <span className=" font-Inter text-fx text-neutral-50 font-medium group-focus:text-neutral-400 pb-2 ">
                Following{" "}
              </span>
            </button>
          </div>
        </main>
      </header>
    </>
  );
}
