import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import Button from "../../components/button";
import { useContext, useState } from "react";
import Modal from "../modal/modal";
import { AuthContext } from "../../context/AuthContext";

export default function LoginMain() {
  const { showModal, SetModal } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <>
      <main className="md:flex md:flex-row  md:items-center ">
        <div className="flex flex-col  md:items-start  max-[767px]:w-screen max-[767px]:h-screen justify-center  md:w-[390px] gap-10 px-7 py-0">
          <section className="text-neutral-50  flex flex-col md:items-start justify-start  gap-3 ">
            <div className=" text-[1.9375rem]    md:text-5xl md:w-[367px] font-bold font-Inter ">
              Happening now
            </div>
            <div className=" text-[1rem]  md:text-[26px] md:font-bold font-medium font-Inter">
              Join today.
            </div>
          </section>

          {/* <div className="hidden md:block  md:w-full "> */}
          <Button
            variant="default"
            type="default"
            onClick={() => {
              navigate("/step1"); // Navigate to "/step1" when the button is clicked
              SetModal(true);
            }}
            // onClick={() => navigate("/step1")}
          >
            Create Account
          </Button>
          {showModal &&
            createPortal(<Modal />, document.getElementById("portal"))}

          <div className="flex justify-center items-center gap-1">
            <div className="bg-neutral-700 w-[155.5px] h-[1px]" />
            <span className="text-neutral-50 text-center font-Inter text-fx ">
              or
            </span>
            <div className="bg-neutral-700 w-[155.5px] h-[1px]" />
          </div>
          <section className="flex flex-col items-start gap-5 md:self-stretch ">
            <p className="md:text-[20px] text-[0.9375rem] md:font-medium font-normal font-Inter text-neutral-50 ">
              Already have an account?
            </p>

            <Button
              variant="outline"
              type="default"
              onClick={() => {
                navigate("/signup");
                SetModal(true);
              }}
            >
              Sign Up
            </Button>
          </section>
        </div>
      </main>
    </>
  );
}
