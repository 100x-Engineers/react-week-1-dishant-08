import { useState, useCallback } from "react";
import { useFollowStatus, useFollow } from "../../hooks";

const FollowBtn = ({ following }) => {
  // Local state for optimistic updates
  const [localFollowing, setLocalFollowing] = useState(null);

  // Fetch follow status
  const { isFollowing: serverFollowing, refetch } = useFollowStatus(following);

  // Follow/unfollow mutation
  const { follow, unfollow, isLoading } = useFollow();

  // Use local state for optimistic updates, fallback to server data
  const isFollowing = localFollowing !== null ? localFollowing : serverFollowing;

  const handleToggleFollow = useCallback(async () => {
    if (isLoading) return;

    // Optimistic update
    const newState = !isFollowing;
    setLocalFollowing(newState);

    try {
      if (newState) {
        await follow(following);
      } else {
        await unfollow(following);
      }
      // Refetch to sync with server
      refetch();
    } catch {
      // Revert on error
      setLocalFollowing(!newState);
    }
  }, [isFollowing, isLoading, follow, unfollow, following, refetch]);

  return (
    <button
      className={`${
        !isFollowing ? "text-black bg-white" : "text-neutral-50"
      } text-[1rem] font-bold font-Inter py-2 px-5 rounded-[1.875rem] mt-2 mr-4 border border-edit-stroke self-end disabled:opacity-50`}
      onClick={handleToggleFollow}
      disabled={isLoading}
    >
      {isLoading ? "..." : isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowBtn;
