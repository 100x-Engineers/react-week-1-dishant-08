import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useRef, useCallback } from "react";
import Card from "./card";
import { FeedSkeleton } from "./TweetSkeleton";
import { useInfiniteUserFeed, useCurrentUser } from "../hooks/useFetch";

export default function UserTweet({ userId }) {
  const { setcurrentLogUser } = useContext(AuthContext);
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  const {
    posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: feedLoading,
  } = useInfiniteUserFeed(userId);
  const { data: currentUser } = useCurrentUser();

  // Update context when current user data is available
  useEffect(() => {
    if (currentUser) {
      setcurrentLogUser(currentUser);
    }
  }, [currentUser, setcurrentLogUser]);

  const handleObserver = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "100px",
      threshold: 0,
    });
    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  if (feedLoading) {
    return <FeedSkeleton count={3} />;
  }

  return (
    <>
      {posts.map((twt) => (
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
      ))}
      <div ref={loadMoreRef} className="h-1" />
      {isFetchingNextPage && <FeedSkeleton count={1} />}
    </>
  );
}
