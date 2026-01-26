import { useMutation as useReactQueryMutation, useQueryClient } from "@tanstack/react-query";
import api from "./useApi";

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      queryClient.invalidateQueries({ queryKey: ["followingFeed"] });
      options.onSuccess?.();
    },
    onError: options.onError,
  });

  return {
    createPost: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error?.message || null,
    data: mutation.data,
    reset: mutation.reset,
  };
}

/**
 * Hook for like/unlike operations
 */
export function useLike() {
  const queryClient = useQueryClient();

  const likeMutation = useReactQueryMutation({
    mutationFn: async (postId) => {
      const response = await api.post("/api/like", { post_id: postId });
      return response.data;
    },
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: ["like", postId] });
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      queryClient.invalidateQueries({ queryKey: ["followingFeed"] });
    },
  });

  const unlikeMutation = useReactQueryMutation({
    mutationFn: async (postId) => {
      const response = await api.delete(`/api/unlike/${postId}`);
      return response.data;
    },
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: ["like", postId] });
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      queryClient.invalidateQueries({ queryKey: ["followingFeed"] });
    },
  });

  return {
    like: likeMutation.mutate,
    unlike: unlikeMutation.mutate,
    isLoading: likeMutation.isPending || unlikeMutation.isPending,
    error: likeMutation.error?.message || unlikeMutation.error?.message || null,
  };
}

/**
 * Hook for retweet/unretweet operations
 */
export function useRetweet() {
  const queryClient = useQueryClient();

  const retweetMutation = useReactQueryMutation({
    mutationFn: async (postId) => {
      const response = await api.post(`/api/retweet/${postId}`);
      return response.data;
    },
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: ["retweet", postId] });
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      queryClient.invalidateQueries({ queryKey: ["followingFeed"] });
    },
  });

  const unretweetMutation = useReactQueryMutation({
    mutationFn: async (postId) => {
      const response = await api.delete(`/api/unretweet/${postId}`);
      return response.data;
    },
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: ["retweet", postId] });
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      queryClient.invalidateQueries({ queryKey: ["followingFeed"] });
    },
  });

  return {
    retweet: retweetMutation.mutate,
    unretweet: unretweetMutation.mutate,
    isLoading: retweetMutation.isPending || unretweetMutation.isPending,
    error: retweetMutation.error?.message || unretweetMutation.error?.message || null,
  };
}

/**
 * Hook for follow/unfollow operations
 */
export function useFollow() {
  const queryClient = useQueryClient();

  const followMutation = useReactQueryMutation({
    mutationFn: async (followingId) => {
      const response = await api.post("/api/follow", { following_id: followingId });
      return response.data;
    },
    onSuccess: (_, followingId) => {
      queryClient.invalidateQueries({ queryKey: ["followStatus", followingId] });
      queryClient.invalidateQueries({ queryKey: ["followingFeed"] });
    },
  });

  const unfollowMutation = useReactQueryMutation({
    mutationFn: async (followingId) => {
      const response = await api.post("/api/unfollow", { following_id: followingId });
      return response.data;
    },
    onSuccess: (_, followingId) => {
      queryClient.invalidateQueries({ queryKey: ["followStatus", followingId] });
      queryClient.invalidateQueries({ queryKey: ["followingFeed"] });
    },
  });

  return {
    follow: followMutation.mutate,
    unfollow: unfollowMutation.mutate,
    isLoading: followMutation.isPending || unfollowMutation.isPending,
    error: followMutation.error?.message || unfollowMutation.error?.message || null,
  };
}

/**
 * Hook for posting a reply
 */
export function useReply() {
  const queryClient = useQueryClient();

  const mutation = useReactQueryMutation({
    mutationFn: async ({ postId, content }) => {
      const response = await api.post(`/api/reply/${postId}`, { content });
      return response.data;
    },
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ["replies", postId] });
      queryClient.invalidateQueries({ queryKey: ["feed"] });
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

