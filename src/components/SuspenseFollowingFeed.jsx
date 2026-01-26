import { Suspense, memo, useMemo } from "react";
import Card from "./card";
import { FeedSkeleton } from "./TweetSkeleton";
import ErrorBoundary from "./ErrorBoundary";
import { useSuspenseFollowingFeed } from "../hooks/useFetch";

/**
 * Batch of tweets for partial rendering
 */
const TweetBatch = memo(function TweetBatch({ tweets }) {
  return (
    <>
      {tweets.map((twt) =>
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
});

/**
 * Inner following feed content using Suspense hooks
 */
function FollowingFeedContent() {
  const { posts } = useSuspenseFollowingFeed();

  // Split posts into batches for progressive rendering
  const batches = useMemo(() => {
    const BATCH_SIZE = 5;
    const result = [];
    for (let i = 0; i < posts.length; i += BATCH_SIZE) {
      result.push(posts.slice(i, i + BATCH_SIZE));
    }
    return result;
  }, [posts]);

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
      {/* Render first batch immediately */}
      {batches[0] && <TweetBatch tweets={batches[0]} />}

      {/* Render remaining batches with individual Suspense boundaries */}
      {batches.slice(1).map((batch, index) => (
        <Suspense key={`batch-${index + 1}`} fallback={<FeedSkeleton count={batch.length} />}>
          <TweetBatch tweets={batch} />
        </Suspense>
      ))}
    </>
  );
}

/**
 * Main Suspense-enabled following feed component
 */
export default function SuspenseFollowingFeed() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<FeedSkeleton count={5} />}>
        <FollowingFeedContent />
      </Suspense>
    </ErrorBoundary>
  );
}
