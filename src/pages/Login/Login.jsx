import LoginHeader from "../../components/Logincomp/LoginHeader";
import LoginMain from "../../components/Logincomp/LoginMain";

export default function Login() {
  return (
    <>
      <div className="bg-neutral-1000  md:py-[236.5px] md:px-[178.436px] flex md:flex-row flex-col md:justify-center md:items-center md:gap-[6.25rem]  ">
        <LoginHeader />
        <LoginMain />
      </div>
    </>
  );
}
