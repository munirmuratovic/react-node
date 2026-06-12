import axios from 'axios';
import type { Post, CreatePostInput, UpdatePostInput } from '../types/post.types';

const API_URL = '/api/posts';

export const postService = {
  getPosts: async (): Promise<Post[]> => {
    const { data } = await axios.get<Post[]>(API_URL);
    return data;
  },

  getPost: async (id: number): Promise<Post> => {
    const { data } = await axios.get<Post>(`${API_URL}/${id}`);
    return data;
  },

  createPost: async (input: CreatePostInput): Promise<Post> => {
    const { data } = await axios.post<Post>(API_URL, input);
    return data;
  },

  updatePost: async (id: number, input: UpdatePostInput): Promise<Post> => {
    const { data } = await axios.put<Post>(`${API_URL}/${id}`, input);
    return data;
  },

  deletePost: async (id: number): Promise<Post> => {
    const { data } = await axios.delete<Post>(`${API_URL}/${id}`);
    return data;
  },
};
