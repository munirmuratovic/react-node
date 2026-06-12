import { useState } from 'react';
import { PostForm } from './PostForm';
import { PostsList } from './PostsList';
import type { Post } from '../types/post.types';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

export function PostsDashboard() {
  const [editingPost, setEditingPost] = useState<Post | undefined>(undefined);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    // Scroll smoothly to form on mobile devices
    const formElement = document.querySelector('form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCancelEdit = () => {
    setEditingPost(undefined);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 max-w-[950px] w-full mx-auto px-5 py-6 box-border text-left">
      {/* Sidebar Form Column */}
      <aside className="w-full">
        <PostForm
          post={editingPost}
          onSubmitSuccess={(msg) => addToast(msg, 'success')}
          onCancel={editingPost ? handleCancelEdit : undefined}
        />
      </aside>

      {/* Main List Column */}
      <main className="flex flex-col min-w-0">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#08060d] dark:text-[#f3f4f6] m-0">
              Feed Posts
            </h1>
            <p className="text-[#6b6375] dark:text-[#9ca3af] text-sm mt-1 m-0">
              Manage, search, edit and remove articles in real time.
            </p>
          </div>
        </div>

        <PostsList onEdit={handleEdit} onDeleteSuccess={(msg) => addToast(msg, 'info')} />
      </main>

      {/* Toast Notification Container */}
      <div className="fixed bottom-6 right-6 z-[1000] flex flex-col gap-2" role="status" aria-live="polite">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg bg-white dark:bg-[#16171d] text-[#08060d] dark:text-[#f3f4f6] border border-[#e5e4e7] dark:border-[#2e303a] shadow-xl text-sm min-w-[250px] font-medium border-l-4 ${
              toast.type === 'success'
                ? 'border-l-emerald-500'
                : toast.type === 'error'
                ? 'border-l-red-500'
                : 'border-l-purple-500'
            }`}
          >
            <span>
              {toast.type === 'success' && '✅ '}
              {toast.type === 'error' && '❌ '}
              {toast.type === 'info' && 'ℹ️ '}
              {toast.message}
            </span>
            <button
              className="ml-auto border-none bg-transparent text-[#6b6375] dark:text-[#9ca3af] cursor-pointer p-0.5 opacity-60 hover:opacity-100"
              onClick={() => removeToast(toast.id)}
              aria-label="Close notification"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
