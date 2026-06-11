import { useQuery, useSuspenseQuery, useInfiniteQuery } from "@tanstack/react-query";
import api from "./useApi";

/**
 * Hook for fetching current user data
 */
export function useCurrentUser() {
  const result = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await api.get("/api/curuser");
      return response.data;
    },
  });

  return {
    data: result.data ?? null,
    isLoading: result.isLoading,
    error: result.error?.message || null,
    refetch: result.refetch,
  };
}

/**
 * Hook for fetching user by username
 */
export function useUserByUsername(username) {
  const result = useQuery({
    queryKey: ["user", "username", username],
    queryFn: async () => {
      const response = await api.get(`/api/getUser/${username}`);
      return response.data;
    },
    enabled: !!username,
  });

  return {
    data: result.data ?? null,
    isLoading: result.isLoading,
    error: result.error?.message || null,
    refetch: result.refetch,
  };
}

/**
 * Hook for fetching replies for a post
 */
export function useReplies(postId) {
  const result = useQuery({
    queryKey: ["replies", postId],
    queryFn: async () => {
      const response = await api.get(`/api/replyfeed/${postId}`);
      return response.data;
    },
    enabled: !!postId,
    staleTime: 0, // Don't cache replies as they update frequently
  });

  return {
    data: result.data ?? null,
    posts: result.data?.posts || [],
    count: result.data?.count || 0,
    isLoading: result.isLoading,
    error: result.error?.message || null,
    refetch: result.refetch,
  };
}

/**
 * Hook for fetching follow status
 */
export function useFollowStatus(followingId) {
  const result = useQuery({
    queryKey: ["followStatus", followingId],
    queryFn: async () => {
      const response = await api.get(`/api/checkFollowStatus?following_id=${followingId}`);
      return response.data;
    },
    enabled: !!followingId,
  });

  return {
    data: result.data ?? null,
    isFollowing: result.data?.status || false,
    isLoading: result.isLoading,
    error: result.error?.message || null,
    refetch: result.refetch,
  };
}

// ============================================
// INFINITE SCROLL HOOKS
// ============================================

const FEED_LIMIT = 8;

/**
 * Infinite scroll hook for fetching the main feed
 * Returns paginated data with fetchNextPage capability
 */
// Shared shape for the cursor-paginated feed endpoints: pageParam is the
// opaque nextCursor from the previous page (null for the first page).
function useInfiniteCursorFeed(queryKey, path, enabled = true) {
  const result = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam }) => {
      const cursorParam = pageParam ? `&cursor=${encodeURIComponent(pageParam)}` : "";
      const response = await api.get(`${path}?limit=${FEED_LIMIT}${cursorParam}`);
      return response.data;
    },
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.nextCursor ?? undefined,
    initialPageParam: null,
    enabled,
  });

  const allPosts = result.data?.pages.flatMap((page) => page.posts) || [];

  return {
    posts: allPosts,
    fetchNextPage: result.fetchNextPage,
    hasNextPage: result.hasNextPage,
    isFetchingNextPage: result.isFetchingNextPage,
    isLoading: result.isLoading,
    isError: result.isError,
    error: result.error?.message || null,
    refetch: result.refetch,
  };
}

export function useInfiniteFeed() {
  return useInfiniteCursorFeed(["feed", "infinite"], "/api/feed");
}

/**
 * Infinite scroll hook for fetching following feed
 * Returns paginated data with fetchNextPage capability
 */
export function useInfiniteFollowingFeed() {
  return useInfiniteCursorFeed(["followingFeed", "infinite"], "/followingfeed");
}

/**
 * Infinite scroll hook for a user's own posts (profile page)
 */
export function useInfiniteUserFeed(userId) {
  return useInfiniteCursorFeed(
    ["userFeed", "infinite", userId],
    `/api/userfeed/${userId}`,
    !!userId
  );
}

// ============================================
// SUSPENSE-ENABLED HOOKS FOR PARTIAL RENDERING
// ============================================

/**
 * Suspense-enabled hook for fetching the main feed
 * Use within a Suspense boundary for streaming/partial rendering
 */
export function useSuspenseFeed() {
  const result = useSuspenseQuery({
    queryKey: ["feed"],
    queryFn: async () => {
      const response = await api.get("/api/feed");
      return response.data;
    },
    staleTime: 30000, // 30 seconds
  });

  return {
    data: result.data ?? null,
    posts: result.data?.posts || [],
    refetch: result.refetch,
  };
}

/**
 * Suspense-enabled hook for fetching following feed
 * Use within a Suspense boundary for streaming/partial rendering
 */
export function useSuspenseFollowingFeed() {
  const result = useSuspenseQuery({
    queryKey: ["followingFeed"],
    queryFn: async () => {
      const response = await api.get("/followingfeed");
      return response.data;
    },
    staleTime: 30000,
  });

  return {
    data: result.data ?? null,
    posts: result.data?.posts || [],
    refetch: result.refetch,
  };
}

/**
 * Suspense-enabled hook for fetching current user
 */
export function useSuspenseCurrentUser() {
  const result = useSuspenseQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await api.get("/api/curuser");
      return response.data;
    },
    staleTime: 60000, // 1 minute - user data changes less frequently
  });

  return {
    data: result.data ?? null,
    refetch: result.refetch,
  };
}
