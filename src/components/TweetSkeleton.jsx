import { memo } from "react";

/**
 * Skeleton loader for a single tweet card
 * Uses CSS animations for shimmer effect
 */
const TweetSkeleton = memo(function TweetSkeleton() {
  return (
    <article className="flex py-2 px-4 gap-4 border-b border-b-neutral-700 animate-pulse">
      {/* Avatar skeleton */}
      <div className="w-12 h-12 rounded-full bg-neutral-700" />

      <div className="flex flex-col gap-2 flex-1">
        {/* Header skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-24 bg-neutral-700 rounded" />
          <div className="h-4 w-32 bg-neutral-700 rounded" />
        </div>

        {/* Content skeleton - multiple lines */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-neutral-700 rounded" />
          <div className="h-4 w-3/4 bg-neutral-700 rounded" />
        </div>

        {/* Action buttons skeleton */}
        <div className="flex justify-between items-center py-3">
          <div className="h-4 w-12 bg-neutral-700 rounded" />
          <div className="h-4 w-12 bg-neutral-700 rounded" />
          <div className="h-4 w-12 bg-neutral-700 rounded" />
          <div className="h-4 w-12 bg-neutral-700 rounded" />
          <div className="h-4 w-8 bg-neutral-700 rounded" />
        </div>
      </div>
    </article>
  );
});

/**
 * Multiple skeleton loaders for feed loading state
 */
export const FeedSkeleton = memo(function FeedSkeleton({ count = 5 }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <TweetSkeleton key={i} />
      ))}
    </>
  );
});
