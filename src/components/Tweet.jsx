import { AuthContext, ForyouTabContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import Card from "./card";
import { useFeed, useCurrentUser } from "../hooks/useFetch";

export default function Tweet() {
  const { tab } = useContext(ForyouTabContext);
  const { setcurrentLogUser } = useContext(AuthContext);

  // Use React Query hooks for data fetching
  const { posts, isLoading: feedLoading, refetch: refetchFeed } = useFeed();
  const { data: currentUser } = useCurrentUser();

  // Update context when current user data is available
  useEffect(() => {
    if (currentUser) {
      setcurrentLogUser(currentUser);
    }
  }, [currentUser, setcurrentLogUser]);

  if (feedLoading) {
    return null;
  }

  return (
    <>
      {posts.map((twt) =>
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
      )}
    </>
  );
}
