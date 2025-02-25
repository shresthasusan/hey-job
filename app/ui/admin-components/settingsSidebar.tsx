"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import {
  ServerIcon,
  BoltIcon,
  CurrencyRupeeIcon,
  UserIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon, label, isActive }) => (
  <li>
    <Link
      href={href}
      className={`flex items-center space-x-4 p-3 rounded-lg transition ${
        isActive
          ? "bg-yellow-400 text-black"
          : "hover:bg-yellow-400 hover:text-black"
      }`}
    >
      <span className="w-6 h-6">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  </li>
);

const SettingsSidebar: React.FC = () => {
  const pathname = usePathname(); // Get current route

  return (
    <div className="left-0 top-0 h-screen px-5 w-1/6 bg-white shadow-md text-black">
      <nav className="flex flex-col h-full py-6">
        {/* Logo */}
        <div className="flex items-center justify-center px-4 mb-6">
          <Image
            src="/logo/login-logo.png"
            alt="logo"
            className="w-20 h-20 p-1"
            width={50}
            height={50}
          />
        </div>

        {/* Admin Profile Section */}
        <div className="flex flex-col items-center px-4 py-4 border-b">
          <Image
            src="/image1.png" // Change this to the admin's actual avatar URL
            alt="Admin Avatar"
            className="w-14 h-14 rounded-full border-2 border-gray-300"
            width={50}
            height={50}
          />
          <span className="mt-2 font-semibold text-sm">John Doe</span>
        </div>

        {/* Navigation Menu */}
        <ul className="mt-8 space-y-3">
          <NavItem
            href="/admin/settings/account"
            icon={<UserIcon className="w-6 h-6" />}
            label="Account Settings"
            isActive={pathname === "/admin"}
          />
          <NavItem
            href="/admin/settings/manage-admins"
            icon={<KeyIcon className="w-6 h-6" />}
            label="Manage Admins"
            isActive={pathname === "/admin/manage-admins"}
          />
          <NavItem
            href="/admin/settings/#"
            icon={<ServerIcon className="w-6 h-6" />}
            label="TBH"
            isActive={pathname === ""}
          />
          <NavItem
            href="/admin/settings/#"
            icon={<CurrencyRupeeIcon className="w-6 h-6" />}
            label="TBH"
            isActive={pathname === ""}
          />
          <NavItem
            href="/admin/settings/#"
            icon={<BoltIcon className="w-6 h-6" />}
            label="tbh"
            isActive={pathname === ""}
          />
        </ul>

        {/* Logout Button */}
        <div className="mt-auto">
          <button
            // onClick={() => signOut()}
            className={`flex items-center text-red-600 space-x-4 p-3 w-full rounded-lg transition
              hover:bg-red-600 hover:text-white`}
          >
            <span className="text-sm font-medium ">Delete Account</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default SettingsSidebar;
