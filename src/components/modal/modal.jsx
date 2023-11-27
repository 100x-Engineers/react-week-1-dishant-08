import { Outlet } from "react-router-dom";
import Step1 from "../../pages/Login/step1";

{
}
// <div className=" sm:fixed  sm:w-[26rem] sm:h-[100px] z-40 top-[0] left-[0] w-screen h-screen   ">
{
  // <div className=" fixed  w-[26rem] h-[100px]  z-40 sm:top-[50%] left-[50%] translate-x-[-50%] translate-y-[-270%]  ">
  {
    /* <div className=" w-screen  h-screen z-40    "> */
  }
}
export default function Modal() {
  return (
    <div className="   fixed  md:w-[26rem] md:h-[100px]  w-screen h-screen  z-40 sm:top-[50%] left-[50%] translate-x-[-50%] translate-y-[-270%]  ">
      {/* <Step1 /> */}
      <Outlet />
    </div>
  );
}
