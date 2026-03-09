'use client';

import Link from 'next/link';

/**
 * Twitter widget showing latest tweet or status
 * Inspired by Marco.fyi about page
 */
export default function TwitterWidget() {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 text-black shadow-sm transition-all duration-300 hover:shadow-md">
      {/* Twitter icon badge */}
      <div className="absolute right-4 top-4">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-blue-500"
          fill="currentColor"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>

      {/* Profile info */}
      <div className="mb-4 flex items-center gap-3">
        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
          AJ
        </div>
        <div>
          <h3 className="font-semibold text-black">AJ</h3>
          <p className="text-sm text-gray-600">@aj_codes</p>
        </div>
      </div>

      {/* Status text */}
      <p className="mb-4 text-sm leading-relaxed text-gray-700">
        Building in public • Freelance engineer & DevRel • Digital nomad
      </p>

      {/* View tweets link */}
      <Link
        href="https://twitter.com/bettysrohl"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
      >
        Read my tweets
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </div>
  );
}

