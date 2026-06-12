import { useState } from 'react';
import type { Post } from '../types/post.types';
import { useDeletePostMutation } from '../hooks/usePostQueries';

interface PostCardProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDeleteSuccess: (message: string) => void;
}

export function PostCard({ post, onEdit, onDeleteSuccess }: PostCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const deleteMutation = useDeletePostMutation();

  const isPending = deleteMutation.isPending;

  const handleDelete = () => {
    deleteMutation.mutate(post.id, {
      onSuccess: () => {
        onDeleteSuccess('Post deleted successfully!');
        setShowConfirm(false);
      },
      onError: (err) => {
        alert(`Failed to delete post: ${err.message}`);
      },
    });
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <article className="relative flex flex-col gap-3 p-6 bg-white dark:bg-[#16171d] border border-[#e5e4e7] dark:border-[#2e303a] rounded-xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05),_0_4px_6px_-2px_rgba(0,0,0,0.03)] hover:border-purple-300 dark:hover:border-purple-900 transition-all duration-300 overflow-hidden after:absolute after:left-0 after:top-0 after:bottom-0 after:w-1 after:bg-[#aa3bff] dark:after:bg-[#c084fc] after:opacity-0 hover:after:opacity-100 after:transition-opacity">
      <header className="flex justify-between items-start gap-4">
        <div>
          <h3 className="text-xl font-semibold text-[#08060d] dark:text-[#f3f4f6] leading-tight m-0">
            {post.title}
          </h3>
          <div className="text-xs text-[#6b6375] dark:text-[#9ca3af] flex gap-2 items-center mt-1.5">
            <span>Published {formatDate(post.createdAt)}</span>
            {post.updatedAt && (
              <>
                <span className="opacity-50">•</span>
                <span className="bg-[#f4f3ec] dark:bg-[#1f2028] text-[#08060d] dark:text-[#f3f4f6] px-1.5 py-0.5 rounded text-[11px]">
                  Edited {formatDate(post.updatedAt)}
                </span>
              </>
            )}
          </div>
        </div>
      </header>

      <p className="text-[15px] leading-relaxed text-[#6b6375] dark:text-[#9ca3af] m-0 whitespace-pre-wrap">
        {post.content}
      </p>

      {!showConfirm ? (
        <footer className="flex justify-end gap-2 border-t border-[#e5e4e7] dark:border-[#2e303a] pt-4 mt-2">
          <button
            className="font-sans text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#e5e4e7] dark:border-[#2e303a] cursor-pointer inline-flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 shadow-sm text-[#6b6375] dark:text-[#9ca3af] bg-transparent hover:bg-[#f4f3ec] dark:hover:bg-[#1f2028] hover:text-[#08060d] dark:hover:text-[#f3f4f6]"
            onClick={() => onEdit(post)}
            disabled={isPending}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
            Edit
          </button>
          <button
            className="font-sans text-xs font-semibold px-3 py-1.5 rounded-lg border border-transparent cursor-pointer inline-flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 shadow-sm bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900/10 hover:bg-red-600 dark:hover:bg-red-600 hover:text-white dark:hover:text-white"
            onClick={() => setShowConfirm(true)}
            disabled={isPending}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
            Delete
          </button>
        </footer>
      ) : (
        <footer className="flex flex-col gap-2 p-3 bg-red-500/5 border border-red-500/15 rounded-lg text-xs text-[#08060d] dark:text-[#f3f4f6]">
          <span>Are you sure you want to delete this post?</span>
          <div className="flex gap-2">
            <button
              className="font-sans text-xs font-semibold px-2.5 py-1 rounded border border-[#e5e4e7] dark:border-[#2e303a] cursor-pointer inline-flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm text-[#6b6375] dark:text-[#9ca3af] bg-transparent hover:bg-[#f4f3ec] dark:hover:bg-[#1f2028]"
              onClick={() => setShowConfirm(false)}
              disabled={isPending}
            >
              Cancel
            </button>
            <button
              className="font-sans text-xs font-semibold px-2.5 py-1 rounded border border-transparent cursor-pointer inline-flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm bg-red-600 text-white hover:bg-red-700"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? 'Deleting...' : 'Yes, Delete'}
            </button>
          </div>
        </footer>
      )}
    </article>
  );
}
