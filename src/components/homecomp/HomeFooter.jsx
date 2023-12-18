import HomeInactive from "../../assets/state-not-selectedhome-icon.svg";
import HomeActive from "../../assets/homeActive.svg";
import IconActive from "../../assets/IconActive.svg";
import IconInactive from "../../assets/IconInactive.svg";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function HomeFooter({ page }) {
  const { currentLogUser, setcurrentLogUser } = useContext(AuthContext);
  const getCurrentUser = async () => {
    try {
      const response = await axios.get(
        "https://one00xapi.onrender.com/api/curuser",
        {
          withCredentials: true,
        }
      );
      const data = await response.data;
      setcurrentLogUser(data);
      // oncurrentLogUserChange(data);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);
  return (
    <>
      <footer className="flex flex-col justify-end flex-grow h-screen ">
        <div className=" flex py-[1.125rem] px-6 justify-center items-center gap-10 border-t border-neutral-800 bg-neutral-1000  ">
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
