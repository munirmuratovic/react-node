import React, { useState, useEffect } from 'react';
import type { Post } from '../types/post.types';
import { useCreatePostMutation, useUpdatePostMutation } from '../hooks/usePostQueries';

interface PostFormProps {
  post?: Post;
  onSubmitSuccess: (message: string) => void;
  onCancel?: () => void;
}

export function PostForm({ post, onSubmitSuccess, onCancel }: PostFormProps) {
  const isEditing = !!post;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

  const createMutation = useCreatePostMutation();
  const updateMutation = useUpdatePostMutation();

  const isPending = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    } else {
      setTitle('');
      setContent('');
    }
    setErrors({});
  }, [post]);

  const validate = () => {
    const newErrors: { title?: string; content?: string } = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!content.trim()) {
      newErrors.content = 'Content is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = { title: title.trim(), content: content.trim() };

    if (isEditing && post) {
      updateMutation.mutate(
        { id: post.id, data: payload },
        {
          onSuccess: () => {
            onSubmitSuccess('Post updated successfully!');
            if (onCancel) onCancel();
          },
          onError: (err) => {
            setErrors({ title: `Error: ${err.message}` });
          },
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          onSubmitSuccess('Post created successfully!');
          setTitle('');
          setContent('');
          if (onCancel) onCancel();
        },
        onError: (err) => {
          setErrors({ title: `Error: ${err.message}` });
        },
      });
    }
  };

  return (
    <form
      className="bg-white dark:bg-[#16171d] border border-[#e5e4e7] dark:border-[#2e303a] rounded-xl p-5 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] h-fit sticky top-6 flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <div>
        <h2 className="text-lg font-medium leading-none mb-1 text-[#08060d] dark:text-[#f3f4f6]">
          {isEditing ? 'Edit Post' : 'Create New Post'}
        </h2>
        <p className="text-xs text-[#6b6375] dark:text-[#9ca3af] m-0">
          {isEditing ? 'Modify the details of your post.' : 'Write something interesting to publish.'}
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="post-title" className="text-xs font-semibold text-[#08060d] dark:text-[#f3f4f6]">
          Title
        </label>
        <input
          id="post-title"
          type="text"
          className="font-sans text-sm p-2.5 rounded-lg border border-[#e5e4e7] dark:border-[#2e303a] bg-white dark:bg-[#16171d] text-[#08060d] dark:text-[#f3f4f6] transition-all duration-200 outline-none focus:border-[#aa3bff] dark:focus:border-[#c084fc] focus:ring-3 focus:ring-[#aa3bff]/10 dark:focus:ring-[#c084fc]/15"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
          }}
          disabled={isPending}
        />
        {errors.title && <span className="text-red-500 text-xs mt-0.5">{errors.title}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="post-content" className="text-xs font-semibold text-[#08060d] dark:text-[#f3f4f6]">
          Content
        </label>
        <textarea
          id="post-content"
          className="font-sans text-sm p-2.5 rounded-lg border border-[#e5e4e7] dark:border-[#2e303a] bg-white dark:bg-[#16171d] text-[#08060d] dark:text-[#f3f4f6] transition-all duration-200 outline-none focus:border-[#aa3bff] dark:focus:border-[#c084fc] focus:ring-3 focus:ring-[#aa3bff]/10 dark:focus:ring-[#c084fc]/15 resize-y min-height-[120px]"
          placeholder="Write your post content here..."
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            if (errors.content) setErrors((prev) => ({ ...prev, content: undefined }));
          }}
          disabled={isPending}
        />
        {errors.content && <span className="text-red-500 text-xs mt-0.5">{errors.content}</span>}
      </div>

      <div className="flex gap-2 mt-2">
        {onCancel && (
          <button
            type="button"
            className="flex-1 bg-transparent text-[#6b6375] dark:text-[#9ca3af] border border-[#e5e4e7] dark:border-[#2e303a] font-sans text-sm font-semibold px-4 py-2 rounded-lg cursor-pointer inline-flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 shadow-sm hover:bg-[#f4f3ec] dark:hover:bg-[#1f2028] hover:text-[#08060d] dark:hover:text-[#f3f4f6]"
            onClick={onCancel}
            disabled={isPending}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="flex-1 bg-[#aa3bff] dark:bg-[#c084fc] text-white font-sans text-sm font-semibold px-4 py-2 rounded-lg border border-transparent cursor-pointer inline-flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 shadow-sm hover:brightness-110"
          disabled={isPending}
        >
          {isPending ? 'Saving...' : isEditing ? 'Update' : 'Publish'}
        </button>
      </div>
    </form>
  );
}
