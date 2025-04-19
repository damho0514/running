"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-orange-500">
          RunTogether
        </Link>
        <nav className="space-x-4 text-sm md:text-base">
          <Link href="/" className="hover:underline">
            홈
          </Link>
          <Link href="/courses" className="hover:underline">
            코스
          </Link>
          <Link href="/community" className="hover:underline">
            커뮤니티
          </Link>
          <Link href="/profile" className="hover:underline">
            마이페이지
          </Link>
        </nav>
      </div>
    </header>
  );
}
