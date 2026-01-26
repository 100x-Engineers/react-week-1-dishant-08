import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import Card from "./card";
import { useUserFeed, useCurrentUser } from "../hooks/useFetch";

export default function UserTweet({ userId }) {
  const { setcurrentLogUser } = useContext(AuthContext);

  // Use React Query hooks
  const { posts, isLoading: feedLoading } = useUserFeed(userId);
  const { data: currentUser } = useCurrentUser();

  // Update context when current user data is available
  useEffect(() => {
    if (currentUser) {
      setcurrentLogUser(currentUser);
    }
  }, [currentUser, setcurrentLogUser]);

  return (
    <>
      {!feedLoading && posts.length !== 0 ? (
        posts.map((twt) =>
          twt.content !== null ? (
            <Card
              key={twt.id}
              postId={twt.id}
              text={twt.content}
              userId={twt.user_id}
              time={twt.posted_at}
              user={twt.user}
              likeCount={twt.likeCount}
              isLiked={twt.isLiked}
              repostCount={twt.repostCount}
              isReposted={twt.isReposted}
              replyCount={twt.replyCount}
            />
          ) : null
        )
      ) : (
        <div className="text-neutral-50 text-center ">
          Posts are Loading...{" "}
        </div>
      )}
    </>
  );
}
