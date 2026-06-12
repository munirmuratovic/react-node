import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import reactLogo from './assets/react.svg';
import { PostsDashboard } from './features/posts';

// Initialize React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-xl mx-auto mt-20">
      <h1 className="text-3xl font-bold tracking-tight text-[#08060d] dark:text-[#f3f4f6] mb-3">
        React Node CRUD Application
      </h1>
      <p className="text-sm text-[#6b6375] dark:text-[#9ca3af] leading-relaxed mb-6">
        This is a boilerplate application integrated with React Query, Axios, and Tailwind CSS.
        Navigate to the Posts feed to interact with the API database in real time.
      </p>
      <NavLink
        to="/posts"
        className="bg-[#aa3bff] dark:bg-[#c084fc] text-white font-sans text-sm font-semibold px-5 py-2.5 rounded-lg border border-transparent cursor-pointer inline-flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 shadow-sm hover:brightness-110"
      >
        Explore Posts Feed
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </NavLink>
    </main>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <header className="flex items-center justify-between border-b border-[#e5e4e7] dark:border-[#2e303a] px-8 py-4 bg-white dark:bg-[#16171d]">
          <NavLink to="/" className="flex items-center gap-2.5 font-bold text-[#08060d] dark:text-[#f3f4f6] text-xl no-underline">
            <img src={reactLogo} height="24" alt="React Logo" />
            React Node CRUD
          </NavLink>
          <nav className="flex gap-5">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-semibold no-underline transition-colors duration-200 ${
                  isActive
                    ? 'text-[#aa3bff] dark:text-[#c084fc]'
                    : 'text-[#6b6375] dark:text-[#9ca3af] hover:text-[#08060d] dark:hover:text-[#f3f4f6]'
                }`
              }
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/posts"
              className={({ isActive }) =>
                `text-sm font-semibold no-underline transition-colors duration-200 ${
                  isActive
                    ? 'text-[#aa3bff] dark:text-[#c084fc]'
                    : 'text-[#6b6375] dark:text-[#9ca3af] hover:text-[#08060d] dark:hover:text-[#f3f4f6]'
                }`
              }
            >
              Posts
            </NavLink>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PostsDashboard />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;


