import UserHeader from "../../components/userProfile/UserHeader";
import TweetLink from "../../components/TweetLink";
import HomeFooter from "../../components/homecomp/HomeFooter";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import DesktopUserPage from "./desktopUserPage";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useMediaQuery } from "react-responsive";
import UserTweet from "../../components/UserTweet";
import { useUserByUsername } from "../../hooks/useFetch";

function MobileUserPage({ children }) {
  window.scrollTo(0, 0);
  return (
    <>
      {children}
      <TweetLink />
      <div className="fixed bottom-0 z-50">
        <HomeFooter page="user" />
      </div>
    </>
  );
}

export default function User() {
  const { userName } = useParams();
  const { showEditModal } = useContext(AuthContext);

  // Use React Query hook for user data
  const { data, isLoading } = useUserByUsername(userName);

  const User = data?.user;
  const timeStamp = "Joined" + " " + moment(User?.createdAt).fromNow();
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  if (isLoading) {
    return (
      <div className="text-neutral-50 text-center py-8">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div
        className={`${isDesktop && "hidden md:block"} ${
          isDesktop && showEditModal && "bg-modal-bg"
        }`}
      >
        {isDesktop ? (
          <DesktopUserPage>
            <UserHeader
              userName={User?.username}
              userFullname={User?.display_name}
              bio={User?.bio}
              userId={User?.id}
              userImage={User?.profile_picture}
              UserBackground={User?.cover_picture}
              following={data?.following}
              followers={data?.follower}
              bioLink={User?.website}
              joinedAt={timeStamp}
            />
            <UserTweet userId={User?.id} />
          </DesktopUserPage>
        ) : (
          <MobileUserPage>
            <UserHeader
              userName={User?.username}
              userFullname={User?.display_name}
              bio={User?.bio}
              userId={User?.id}
              userImage={User?.profile_picture}
              UserBackground={User?.cover_picture}
              following={data?.following}
              followers={data?.follower}
              bioLink={User?.website}
              joinedAt={timeStamp}
            />
            <UserTweet userId={User?.id} />
          </MobileUserPage>
        )}
      </div>
    </>
  );
}
