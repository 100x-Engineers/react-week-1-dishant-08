import { memo, useEffect, useRef, useCallback } from "react";
import Card from "./Card";
import { FeedSkeleton } from "./TweetSkeleton";
import ErrorBoundary from "./ErrorBoundary";
import { FeedError } from "./SuspenseFeed";
import { useInfiniteFollowingFeed } from "../hooks/useFetch";

/**
 * Batch of tweets for rendering (null-content rows are filtered server-side)
 */
const TweetBatch = memo(function TweetBatch({ tweets }) {
  return (
    <>
      {tweets.map((twt) => (
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
    </>
  );
});

/**
 * Loading spinner for infinite scroll
 */
function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

/**
 * Inner following feed content with infinite scroll
 */
function FollowingFeedContent() {
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  // Infinite scroll feed
  const {
    posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteFollowingFeed();

  // Intersection Observer for infinite scroll
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

  if (isLoading) {
    return <FeedSkeleton count={6} />;
  }

  if (isError) {
    return <FeedError message={error} onRetry={refetch} />;
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] p-4 text-center">
        <p className="text-neutral-400">
          No posts from people you follow yet.
        </p>
      </div>
    );
  }

  return (
    <>
      <TweetBatch tweets={posts} />

      {/* Infinite scroll trigger */}
      <div ref={loadMoreRef} className="h-1" />

      {/* Loading indicator */}
      {isFetchingNextPage && <LoadingSpinner />}

      {/* End of feed message */}
      {!hasNextPage && posts.length > 0 && (
        <div className="flex justify-center py-4 text-neutral-500 text-sm">
          You've reached the end
        </div>
      )}
    </>
  );
}

/**
 * Main following feed component with infinite scroll
 */
export default function SuspenseFollowingFeed() {
  return (
    <ErrorBoundary>
      <FollowingFeedContent />
    </ErrorBoundary>
  );
}
