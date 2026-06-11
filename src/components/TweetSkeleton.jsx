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

/**
 * Skeleton for the profile page: cover, avatar, name lines, then a few tweets
 */
export const ProfileSkeleton = memo(function ProfileSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="relative">
        <div className="w-full h-[200px] bg-neutral-700" />
        <div className="absolute -bottom-8 left-3 w-[4.25rem] h-[4.25rem] rounded-full bg-neutral-700 border-4 border-neutral-1000" />
      </div>
      <div className="flex flex-col gap-3 mt-12 ml-5 mr-4 pb-4 border-b border-b-neutral-700">
        <div className="h-5 w-40 bg-neutral-700 rounded" />
        <div className="h-4 w-28 bg-neutral-700 rounded" />
        <div className="h-4 w-3/4 bg-neutral-700 rounded" />
        <div className="flex gap-5">
          <div className="h-4 w-24 bg-neutral-700 rounded" />
          <div className="h-4 w-24 bg-neutral-700 rounded" />
        </div>
      </div>
      <FeedSkeleton count={3} />
    </div>
  );
});
