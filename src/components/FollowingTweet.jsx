import { useContext } from "react";
import Card from "./card";
import { ForyouTabContext } from "../context/AuthContext";
import { useFollowingFeed } from "../hooks/useFetch";

export default function FollowingTweet() {
  const { tab } = useContext(ForyouTabContext);

  // Use React Query hook for fetching following feed
  const { posts, isLoading } = useFollowingFeed(tab);

  if (isLoading) {
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
