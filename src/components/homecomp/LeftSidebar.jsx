import { useEffect, useState, useContext, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import Logo100 from "../../assets/copy-link-100.svg";
import HomeInactive from "../../assets/state-not-selectedhome-icon.svg";
import HomeActive from "../../assets/homeActive.svg";
import IconActive from "../../assets/IconActive.svg";
import IconInactive from "../../assets/menu-item-group.svg";
import Logox from "../../assets/copy-link-group-27162.svg";
import Button from "../Button";
import userAvatar from "../../assets/user-avatar.png";
import SignOut from "../../assets/logout.svg";
import TweetModal from "../modal/TweetModal";
import { AuthContext } from "../../context/AuthContext";
import { useCurrentUser, useLogout } from "../../hooks";

function DesktopHome({ page, oncurrentLogUserChange }) {
  const { setcurrentLogUser } = useContext(AuthContext);

  // Fetch current user using custom hook
  const { data: currentUserData } = useCurrentUser();

  // Update context and callback when user data changes
  useEffect(() => {
    if (currentUserData) {
      setcurrentLogUser(currentUserData);
      oncurrentLogUserChange?.(currentUserData);
    }
  }, [currentUserData, setcurrentLogUser, oncurrentLogUserChange]);

  return (
    <>
      <div>
        <Link to="/home" className="flex py-3 px-5 gap-5">
          <img src={page === "home" ? HomeActive : HomeInactive} alt="Home" />
          <p className="text-neutral-50 font-Inter text-[1.1875rem] font-medium">
            Home
          </p>
        </Link>
      </div>
      <div>
        <Link
          to={`/user/${currentUserData?.currUser}`}
          className="flex py-3 px-5 gap-5"
        >
          <img
            src={page === "user" ? IconActive : IconInactive}
            alt="Profile"
          />
          <p className="text-neutral-50 font-Inter text-[1.1875rem] font-medium">
            Profile
          </p>
        </Link>
      </div>
    </>
  );
}

export default function LeftSidebar({ page }) {
  const { showTweetModal, SetShowTweetModal, SetModal } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currUser, setCurrUser] = useState(null);

  // Logout mutation hook
  const { logout, isLoading: isLoggingOut } = useLogout();

  const handleUserChange = useCallback((data) => {
    setCurrUser(data);
  }, []);

  const handleSignOut = useCallback(async () => {
    if (isLoggingOut) return;

    try {
      await logout();
      SetModal(false);
      navigate("/");
    } catch {
      // Error handled by hook
    }
  }, [isLoggingOut, logout, SetModal, navigate]);

  return (
    <div className="flex p-5 flex-col h-screen justify-between border-r border-r-neutral-700">
      <div className="flex flex-col gap-2">
        <div className="py-3 px-5 flex justify-start gap-2.5 self-stretch">
          <div className="flex justify-center items-end gap-0.5">
            <img src={Logo100} alt="Logo 100" />
            <img src={Logox} alt="X" />
          </div>
        </div>
        <DesktopHome page={page} oncurrentLogUserChange={handleUserChange} />
        <div className="p-2.5">
          <div className="py-tx">
            <Button
              variant="solidBlue"
              type="medium"
              onClick={() => SetShowTweetModal(true)}
            >
              Post
            </Button>
            {showTweetModal &&
              createPortal(<TweetModal />, document.getElementById("portal"))}
          </div>
        </div>
      </div>
      <footer>
        <div className="flex justify-between items-center self-stretch">
          <Link to={`/user/${currUser?.currUser}`}>
            <div className="flex items-start gap-3">
              <img
                src={currUser?.dp || userAvatar}
                alt="user-avatar"
                className="w-12 rounded-full h-12 object-cover"
              />
              <div className="flex flex-col items-start">
                <p className="text-neutral-50 font-Inter text-fx font-bold">
                  {currUser?.disName}
                </p>
                <p className="text-neutral-500 font-Inter text-fx">
                  @{currUser?.currUser}
                </p>
              </div>
            </div>
          </Link>

          <div className="flex justify-center items-center w-[3rem] h-[3rem] px-[0.49413rem]">
            <button
              onClick={handleSignOut}
              disabled={isLoggingOut}
              className="disabled:opacity-50"
            >
              <img src={SignOut} alt="Sign Out" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
