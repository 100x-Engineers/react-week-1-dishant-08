import { useLocation } from "react-router-dom";
import LoginHeader from "../../components/Logincomp/LoginHeader";
import LoginMain from "../../components/Logincomp/LoginMain";

export default function Login() {
  // Modal visibility is route-driven so a refresh on /step2 etc. keeps the
  // signup flow open instead of resetting to the landing page.
  const { pathname } = useLocation();
  const isModalOpen = pathname !== "/";

  return (
    <div
      className={
        `   md:py-[236.5px] md:px-[178.436px] flex md:flex-row flex-col md:justify-center md:items-center md:gap-[6.25rem]  ` +
        (isModalOpen ? "bg-modal-bg " : "")
      }
    >
      <LoginHeader />
      <LoginMain />
    </div>
  );
}
