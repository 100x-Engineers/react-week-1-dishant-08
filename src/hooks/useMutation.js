import {
  useMutation as useReactQueryMutation,
  useQueryClient,
} from "@tanstack/react-query";
import api from "./useApi";

// Every cache that holds enriched post objects (plain { posts } envelopes and
// infinite-query { pages: [{ posts }] } shapes).
const POST_CACHE_PREFIXES = [
  ["feed"],
  ["followingFeed"],
  ["userFeed"],
  ["replies"],
];

const updatePage = (page, postId, updater) => {
  if (!page?.posts?.some((post) => post.id === postId)) return page;
  return {
    ...page,
    posts: page.posts.map((post) =>
      post.id === postId ? updater(post) : post
    ),
  };
};

const updatePostEverywhere = (queryClient, postId, updater) => {
  POST_CACHE_PREFIXES.forEach((prefix) => {
    queryClient.setQueriesData({ queryKey: prefix }, (old) => {
      if (!old) return old;
      if (old.pages) {
        return {
          ...old,
          pages: old.pages.map((page) => updatePage(page, postId, updater)),
        };
      }
      return updatePage(old, postId, updater);
    });
  });
};

// Shared optimistic-update wiring: apply the updater to the post in every
// cache immediately, roll all caches back if the request fails. No
// invalidation on success — the cache already matches the server.
const usePostMutation = (mutationFn, updater) => {
  const queryClient = useQueryClient();
  return useReactQueryMutation({
    mutationFn,
    onMutate: async (postId) => {
      await Promise.all(
        POST_CACHE_PREFIXES.map((prefix) =>
          queryClient.cancelQueries({ queryKey: prefix })
        )
      );
      const snapshots = POST_CACHE_PREFIXES.flatMap((prefix) =>
        queryClient.getQueriesData({ queryKey: prefix })
      );
      updatePostEverywhere(queryClient, postId, updater);
      return { snapshots };
    },
    onError: (_err, _postId, context) => {
      context?.snapshots?.forEach(([key, data]) =>
        queryClient.setQueryData(key, data)
      );
    },
  });
};

/**
 * Hook for creating a new post/tweet
 */
export function useCreatePost(options = {}) {
  const queryClient = useQueryClient();

  const mutation = useReactQueryMutation({
    mutationFn: async (content) => {
      const response = await api.post("/api/post", { content });
      return response.data;
    },
    onSuccess: async () => {
      // Wait for invalidation to complete before calling onSuccess callback
      await queryClient.invalidateQueries({ queryKey: ["feed"] });
      await queryClient.invalidateQueries({ queryKey: ["followingFeed"] });
      await queryClient.invalidateQueries({ queryKey: ["userFeed"] });
      options.onSuccess?.();
    },
    onError: options.onError,
  });

  return {
    createPost: mutation.mutate,
    createPostAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error?.message || null,
    data: mutation.data,
    reset: mutation.reset,
  };
}

/**
 * Hook for like/unlike operations with optimistic cache updates
 */
export function useLike() {
  const likeMutation = usePostMutation(
    (postId) => api.post("/api/like", { post_id: postId }),
    (post) => ({ ...post, isLiked: true, likeCount: post.likeCount + 1 })
  );

  const unlikeMutation = usePostMutation(
    (postId) => api.delete(`/api/unlike/${postId}`),
    (post) => ({
      ...post,
      isLiked: false,
      likeCount: Math.max(0, post.likeCount - 1),
    })
  );

  return {
    like: likeMutation.mutate,
    unlike: unlikeMutation.mutate,
    isLoading: likeMutation.isPending || unlikeMutation.isPending,
    error: likeMutation.error?.message || unlikeMutation.error?.message || null,
  };
}

/**
 * Hook for retweet/unretweet operations with optimistic cache updates
 */
export function useRetweet() {
  const retweetMutation = usePostMutation(
    (postId) => api.post(`/api/retweet/${postId}`),
    (post) => ({
      ...post,
      isReposted: true,
      repostCount: post.repostCount + 1,
    })
  );

  const unretweetMutation = usePostMutation(
    (postId) => api.delete(`/api/unretweet/${postId}`),
    (post) => ({
      ...post,
      isReposted: false,
      repostCount: Math.max(0, post.repostCount - 1),
    })
  );

  return {
    retweet: retweetMutation.mutate,
    unretweet: unretweetMutation.mutate,
    isLoading: retweetMutation.isPending || unretweetMutation.isPending,
    error:
      retweetMutation.error?.message ||
      unretweetMutation.error?.message ||
      null,
  };
}

/**
 * Hook for follow/unfollow operations
 */
export function useFollow() {
  const queryClient = useQueryClient();

  const followMutation = useReactQueryMutation({
    mutationFn: async (followingId) => {
      const response = await api.post("/api/follow", {
        following_id: followingId,
      });
      return response.data;
    },
    onSuccess: (_, followingId) => {
      queryClient.invalidateQueries({
        queryKey: ["followStatus", followingId],
      });
      queryClient.invalidateQueries({ queryKey: ["followingFeed"] });
    },
  });

  const unfollowMutation = useReactQueryMutation({
    mutationFn: async (followingId) => {
      const response = await api.post("/api/unfollow", {
        following_id: followingId,
      });
      return response.data;
    },
    onSuccess: (_, followingId) => {
      queryClient.invalidateQueries({
        queryKey: ["followStatus", followingId],
      });
      queryClient.invalidateQueries({ queryKey: ["followingFeed"] });
    },
  });

  return {
    follow: followMutation.mutate,
    unfollow: unfollowMutation.mutate,
    isLoading: followMutation.isPending || unfollowMutation.isPending,
    error:
      followMutation.error?.message || unfollowMutation.error?.message || null,
  };
}

/**
 * Hook for posting a reply: bumps the parent's replyCount in every cache and
 * refreshes the reply list itself.
 */
export function useReply() {
  const queryClient = useQueryClient();

  const mutation = useReactQueryMutation({
    mutationFn: async ({ postId, content }) => {
      const response = await api.post(`/api/reply/${postId}`, { content });
      return response.data;
    },
    onSuccess: (_, { postId }) => {
      updatePostEverywhere(queryClient, postId, (post) => ({
        ...post,
        replyCount: (post.replyCount || 0) + 1,
      }));
      queryClient.invalidateQueries({ queryKey: ["replies", postId] });
    },
  });

  return {
    reply: (postId, content) => mutation.mutate({ postId, content }),
    isLoading: mutation.isPending,
    error: mutation.error?.message || null,
    data: mutation.data,
    reset: mutation.reset,
  };
}

/**
 * Hook for logout
 */
export function useLogout() {
  const queryClient = useQueryClient();

  const mutation = useReactQueryMutation({
    mutationFn: async () => {
      const response = await api.post("/api/logout");
      return response.data;
    },
    onSuccess: () => {
      // Clear all cached data on logout
      queryClient.clear();
    },
  });

  return {
    logout: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error?.message || null,
  };
}
