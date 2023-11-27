import LoginHeader from "../../components/Logincomp/LoginHeader";
import LoginMain from "../../components/Logincomp/LoginMain";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Modal from "../../components/modal/modal";
import { createPortal } from "react-dom";
export default function Login() {
  const { showModal, SetModal } = useContext(AuthContext);
  return (
    <>
      {/* <div className="w-screen h-screen">
        {showModal &&
          createPortal(<Modal />, document.getElementById("portal"))}
      </div> */}
      <div
        className={
          `   md:py-[236.5px] md:px-[178.436px] flex md:flex-row flex-col md:justify-center md:items-center md:gap-[6.25rem]  ` +
          (showModal && "bg-modal-bg ")
        }
      >
        <LoginHeader />
        <LoginMain />
      </div>
    </>
  );
}
