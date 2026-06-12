import { useState } from 'react';
import { usePostsQuery } from '../hooks/usePostQueries';
import { PostCard } from './PostCard';
import type { Post } from '../types/post.types';

interface PostsListProps {
  onEdit: (post: Post) => void;
  onDeleteSuccess: (message: string) => void;
}

export function PostsList({ onEdit, onDeleteSuccess }: PostsListProps) {
  const { data: posts, isLoading, isError, error } = usePostsQuery();
  const [searchQuery, setSearchQuery] = useState('');

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="relative flex flex-col gap-4 p-6 bg-white dark:bg-[#16171d] border border-[#e5e4e7] dark:border-[#2e303a] rounded-xl overflow-hidden animate-pulse"
          >
            <div className="h-6 bg-[#e5e4e7] dark:bg-[#2e303a] rounded w-3/5"></div>
            <div className="h-3 bg-[#e5e4e7] dark:bg-[#2e303a] rounded w-1/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-[#e5e4e7] dark:bg-[#2e303a] rounded w-full"></div>
              <div className="h-4 bg-[#e5e4e7] dark:bg-[#2e303a] rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 border border-red-500/30 rounded-xl bg-red-500/5 text-red-600 dark:text-red-400">
        <h3 className="text-base font-semibold m-0 mb-1">Failed to load posts</h3>
        <p className="text-sm m-0">{error?.message || 'An unexpected error occurred while fetching posts.'}</p>
      </div>
    );
  }

  const filteredPosts = (posts || []).filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="relative flex items-center mb-6">
        <svg
          className="absolute left-3.5 text-[#6b6375] dark:text-[#9ca3af] pointer-events-none opacity-70"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          className="w-full pl-10 pr-4 py-3 text-base font-sans rounded-lg border border-[#e5e4e7] dark:border-[#2e303a] bg-white dark:bg-[#16171d] text-[#08060d] dark:text-[#f3f4f6] transition-all duration-200 outline-none focus:border-[#aa3bff] dark:focus:border-[#c084fc] focus:ring-3 focus:ring-[#aa3bff]/10 dark:focus:ring-[#c084fc]/15"
          placeholder="Search posts by title or content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-12 px-6 border-2 border-dashed border-[#e5e4e7] dark:border-[#2e303a] rounded-xl text-[#6b6375] dark:text-[#9ca3af] flex flex-col items-center gap-3">
          <span className="text-4xl opacity-50">✍️</span>
          <h3 className="text-lg font-medium text-[#08060d] dark:text-[#f3f4f6] m-0">
            {posts && posts.length > 0 ? 'No matching posts' : 'No posts yet'}
          </h3>
          <p className="text-sm text-[#6b6375] dark:text-[#9ca3af] max-w-xs m-0 leading-relaxed">
            {posts && posts.length > 0
              ? 'Try adjusting your search keywords to find what you are looking for.'
              : 'Get started by creating your very first post using the form.'}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={onEdit}
              onDeleteSuccess={onDeleteSuccess}
            />
          ))}
        </div>
      )}
    </div>
  );
}
