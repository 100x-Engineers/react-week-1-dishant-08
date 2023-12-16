import EditHeader from "../../components/editProfile/EditHeader";
import EditMain from "../../components/editProfile/EditMain";
import bgImage from "../../assets/bgimage.png";
import userAvatar from "../../assets/user-avatar.png";

export default function Edit() {
  return (
    <>
      <div className=" hidden fixed overflow-y-auto  md:block bg-neutral-1000 rounded-2xl px-4  z-40 sm:top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  ">
        <EditMain userImage={userAvatar} UserBackground={bgImage} />
      </div>
      <div className="  fixed  overflow-y-auto md:hidden  w-screen h-screen bg-neutral-1000  z-40 top-[0%] left-[0%] ">
        <EditMain userImage={userAvatar} UserBackground={bgImage} />
      </div>
    </>
  );
}
