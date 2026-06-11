import UserHeader from "../../components/userProfile/UserHeader";
import TweetLink from "../../components/TweetLink";
import HomeFooter from "../../components/homecomp/HomeFooter";
import LeftSidebar from "../../components/homecomp/LeftSidebar";
import RightSidebar from "../../components/homecomp/RightSidebar";
import UserTweet from "../../components/UserTweet";
import { ProfileSkeleton } from "../../components/TweetSkeleton";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useUserByUsername } from "../../hooks/useFetch";

// Same responsive shell as Home: sidebars from md/lg up, bottom nav and
// floating compose button on mobile.
export default function User() {
  const { userName } = useParams();
  const { showEditModal } = useContext(AuthContext);

  const { data, isLoading, error, refetch } = useUserByUsername(userName);

  const profileUser = data?.user;
  const timeStamp = "Joined " + moment(profileUser?.createdAt).fromNow();

  let center;
  if (isLoading) {
    center = <ProfileSkeleton />;
  } else if (error || !profileUser) {
    center = (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-4 p-4 text-center">
        <p className="text-neutral-50 font-Inter font-semibold">
          Couldn&apos;t load this profile.
        </p>
        <p className="text-neutral-500 font-Inter text-sm">
          {error || "User not found"}
        </p>
        <button
          onClick={() => refetch()}
          className="text-neutral-1000 bg-neutral-50 font-Inter font-bold py-2 px-5 rounded-[1.875rem]"
        >
          Retry
        </button>
      </div>
    );
  } else {
    center = (
      <>
        <UserHeader
          userName={profileUser.username}
          userFullname={profileUser.display_name}
          bio={profileUser.bio}
          userId={profileUser.id}
          userImage={profileUser.profile_picture}
          UserBackground={profileUser.cover_picture}
          following={data?.following}
          followers={data?.follower}
          bioLink={profileUser.website}
          joinedAt={timeStamp}
        />
        <UserTweet userId={profileUser.id} />
      </>
    );
  }

  return (
    <div
      className={`flex justify-center ${showEditModal ? "bg-modal-bg" : ""}`}
    >
      <div className="hidden md:block">
        <LeftSidebar page="user" />
      </div>

      <div className="w-full md:w-[37.5rem] h-screen px-[0.0625rem] flex flex-col overflow-y-auto no-scrollbar pb-16 md:pb-0">
        {center}
      </div>

      <div className="hidden lg:block">
        <RightSidebar />
      </div>

      <div className="md:hidden">
        <TweetLink />
        <HomeFooter page="user" />
      </div>
    </div>
  );
}
