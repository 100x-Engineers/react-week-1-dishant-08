import EditMain from "../../components/editProfile/EditMain";
import bgImage from "../../assets/bgimage.png";
import userAvatar from "../../assets/user-avatar.png";
import { useMediaQuery } from "react-responsive";

export default function Edit() {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <>
      <div
        className={`fixed overflow-y-auto ${
          isDesktop ? "md:block" : "md:hidden"
        } bg-neutral-1000 rounded-2xl px-4 z-40 ${
          isDesktop
            ? "sm:top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
            : "top-[0%] left-[0%] w-screen h-screen"
        }`}
      >
        <EditMain userImage={userAvatar} UserBackground={bgImage} />
      </div>
    </>
  );
}
