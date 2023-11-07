import EditHeader from "../../components/editProfile/EditHeader";
import EditMain from "../../components/editProfile/EditMain";
import bgImage from "../../assets/bgimage.png";
import userAvatar from "../../assets/user-avatar.png";

export default function Edit() {
  return (
    <>
      <EditHeader />
      <EditMain
        userName=" @dishant_sahu "
        userFullname=" Dishant sahu"
        bio="   Digital Goodies Team - Web & Mobile UI/UX development; Graphics; Illustrations "
        userImage={userAvatar}
        UserBackground={bgImage}
        bioLink="pixsellz.io "
      />
    </>
  );
}
