import { Link } from "react-router-dom";
import Logo from "../../assets/100x-Logo.svg";
import userAvatar from "../../assets/user-avatar.png";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

// Mobile-only top bar (avatar + logo); the feed itself is rendered by the
// page so phone and desktop share the same feed components.
export default function HomeHeader() {
  const { currentLogUser } = useContext(AuthContext);

  return (
    <header className="md:hidden flex flex-col items-start shrink-0 rounded-2xl">
      <div className="relative flex py-5 px-4 justify-center  w-full   border-b border-b-neutral-700">
        <Link to={`/user/${currentLogUser?.currUser}`}>
          <img
            src={currentLogUser?.dp || userAvatar}
            alt="user-avatar"
            className=" absolute rounded-full w-12 h-12 left-4 top-2 object-cover"
          />
        </Link>

        <img
          className=" justify-center self-center "
          src={Logo}
          alt="100x-logo"
        />
      </div>
    </header>
  );
}
