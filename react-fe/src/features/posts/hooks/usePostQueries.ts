import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postService } from '../services/post.service';
import type { CreatePostInput, UpdatePostInput, Post } from '../types/post.types';

export const usePostsQuery = () => {
  return useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: postService.getPosts,
  });
};

export const usePostQuery = (id: number) => {
  return useQuery<Post, Error>({
    queryKey: ['posts', id],
    queryFn: () => postService.getPost(id),
    enabled: !!id,
  });
};

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<Post, Error, CreatePostInput>({
    mutationFn: postService.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<Post, Error, { id: number; data: UpdatePostInput }>({
    mutationFn: ({ id, data }) => postService.updatePost(id, data),
    onSuccess: (updatedPost) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['posts', updatedPost.id] });
    },
  });
};

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<Post, Error, number>({
    mutationFn: postService.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
