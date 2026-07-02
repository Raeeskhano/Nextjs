"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  return (
    <div className="p-4 bg-emerald-900 text-white flex justify-around items-center">
      <span className="text-2xl font-bold text-white">My App</span>
      <ul className="flex gap-4 justify-end">
        <li>
          {" "}
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
        </li>
        <li>
          {" "}
          <Link href="/about" className="hover:underline">
            About
          </Link>{" "}
        </li>
        <li>
          <select
            className="bg-emerald-900 text-white border-none focus:ring-0"
            defaultValue=""
            onChange={(e) => router.push(e.target.value)}
            aria-label="Navigate to dashboard"
          >
            <option value="">Dashboards</option>
            <option value="/dashboard/user">User Dashboard</option>
            <option value="/dashboard/analytics">Analytics Dashboard</option>
          </select>
        </li>
      </ul>
    </div>
  );
};

export default Header;
