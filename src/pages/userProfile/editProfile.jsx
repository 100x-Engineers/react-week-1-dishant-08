import EditHeader from "../../components/editProfile/EditHeader";
import EditMain from "../../components/editProfile/EditMain";
import bgImage from "../../assets/bgimage.png";
import userAvatar from "../../assets/user-avatar.png";

export default function Edit() {
  return (
    <>
      <div className=" hidden fixed overflow-y-auto  md:block bg-neutral-1000 rounded-2xl   z-40 sm:top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  ">
        <EditMain
          userName=" @dishant_sahu "
          userFullname=" Dishant sahu"
          bio="   Digital Goodies Team - Web & Mobile UI/UX development; Graphics; Illustrations "
          userImage={userAvatar}
          UserBackground={bgImage}
          bioLink="pixsellz.io "
        />
      </div>
      <div className="  fixed  overflow-y-auto md:hidden  w-screen h-screen   z-40 top-[0%] left-[0%] ">
        <EditMain
          userName=" @dishant_sahu "
          userFullname=" Dishant sahu"
          bio="   Digital Goodies Team - Web & Mobile UI/UX development; Graphics; Illustrations "
          userImage={userAvatar}
          UserBackground={bgImage}
          bioLink="pixsellz.io "
        />
      </div>
    </>
  );
}
