import React from "react";
import { FiLogOut, FiBookOpen } from "react-icons/fi";

export default function Home({ user, handleLogout }) {
  const name = user?.name?.trim() || "User";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              <FiBookOpen size={20} />
            </div>

            <span className="text-lg font-bold text-slate-900">
              Deployment Turorial
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <FiLogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Welcome Section */}
      <main className="mx-auto max-w-5xl px-5 py-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="mb-6 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-blue-100 text-2xl font-semibold text-blue-600">
              {user?.avatar?.url ? (
                <img
                  src={user.avatar.url}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              ) : (
                name.charAt(0).toUpperCase()
              )}
            </div>

            {/* Welcome Message */}
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Welcome to Deployment Turorial
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Hello, {name}! 👋
            </h1>

            <p className="mt-3 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
              We're glad to have you here. Get ready to learn, explore, and
              build something amazing.
            </p>

            {/* User Details */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {user?.email && (
                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
                  {user.email}
                </span>
              )}

              {user?.role && (
                <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium capitalize text-blue-700">
                  {user.role}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} Deployment Turorial. Keep learning, keep
          growing.
        </p>
      </main>
    </div>
  );
}
