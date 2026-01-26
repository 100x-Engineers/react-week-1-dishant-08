import HomeInactive from "../../assets/state-not-selectedhome-icon.svg";
import HomeActive from "../../assets/homeActive.svg";
import IconActive from "../../assets/IconActive.svg";
import IconInactive from "../../assets/IconInactive.svg";
import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useCurrentUser } from "../../hooks/useFetch";

export default function HomeFooter({ page }) {
  const { currentLogUser, setcurrentLogUser } = useContext(AuthContext);

  // Use React Query hook for current user
  const { data: userData } = useCurrentUser();

  // Update context when user data is available
  useEffect(() => {
    if (userData) {
      setcurrentLogUser(userData);
    }
  }, [userData, setcurrentLogUser]);

  return (
    <>
      <footer className="flex flex-col justify-end flex-grow fixed bottom-0 left-0 right-0">
        <div className="flex py-[1.125rem] px-6 justify-center items-center gap-10 border-t border-neutral-800 bg-neutral-1000">
          <Link to={"/home"}>
            <img src={page === "home" ? HomeActive : HomeInactive} />
          </Link>
          <Link to={`/user/${currentLogUser?.currUser}`}>
            <img src={page === "user" ? IconActive : IconInactive} />
          </Link>
        </div>
      </footer>
    </>
  );
}
