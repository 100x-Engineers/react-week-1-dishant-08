import { memo, useContext, useEffect, useRef, useCallback } from "react";
import Card from "./Card";
import { FeedSkeleton } from "./TweetSkeleton";
import ErrorBoundary from "./ErrorBoundary";
import { AuthContext } from "../context/AuthContext";
import { useInfiniteFeed, useCurrentUser } from "../hooks/useFetch";

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
 * Error state with retry for a failed feed request
 */
// eslint-disable-next-line react/prop-types
export function FeedError({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4 p-4 text-center">
      <p className="text-neutral-50 font-Inter font-semibold">
        Something went wrong.
      </p>
      <p className="text-neutral-500 font-Inter text-sm">
        {message || "Couldn't load the feed."}
      </p>
      <button
        onClick={onRetry}
        className="text-neutral-1000 bg-neutral-50 font-Inter font-bold py-2 px-5 rounded-[1.875rem]"
      >
        Retry
      </button>
    </div>
  );
}

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
 * Inner feed content with infinite scroll
 */
function FeedContent() {
  const { setcurrentLogUser } = useContext(AuthContext);
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  // Fetch current user
  const { data: currentUser } = useCurrentUser();

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
  } = useInfiniteFeed();

  // Update context when current user data is available
  useEffect(() => {
    if (currentUser) {
      setcurrentLogUser(currentUser);
    }
  }, [currentUser, setcurrentLogUser]);

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
        <p className="text-neutral-400">No posts yet. Start following people!</p>
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
 * Main feed component with infinite scroll
 */
export default function SuspenseFeed() {
  return (
    <ErrorBoundary>
      <FeedContent />
    </ErrorBoundary>
  );
}
