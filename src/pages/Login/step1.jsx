import StepOneMain from "../../components/step1comp/stepOneMain";
import StepHeader from "../../components/stepHeader";
import cancel from "../../assets/create-account-1-signup-x.svg";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/modal/modal";

export default function Step1() {
  const { showModal, SetModal } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <>
      <div className=" flex  px-tx pt-0 pb-5 flex-col  w-screen h-screen z-40 md:w-auto md:h-auto gap-3 shrink-0 bg-neutral-1000 rounded-2xl">
        <StepHeader number="1" />
        <StepOneMain />
      </div>
    </>
  );
}

/* <header>
            <div className=" flex py-3 px-0 items-center gap-5 self-stretch">
              <button
                onClick={() => {
                  SetModal(false);
                  navigate(-1);
                }}
              >
                <img src={cancel} alt="cross-button" />
              </button>
              <Link to={"/"}>
              <img src={cancel} alt="cross-button" />
            </Link> 
              <span className=" font-Inter text-tx font-bold text-neutral-50">
                Step 1 of 4
              </span>
            </div>
          </header> 
        */
