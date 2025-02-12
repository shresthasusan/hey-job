"use client";

import { useState } from "react";
import Link from "next/link";

import React from "react";
import {
  AdjustmentsHorizontalIcon,
  HomeIcon,
  ServerIcon,
} from "@heroicons/react/24/outline";
import { BoltIcon, CurrencyRupeeIcon } from "@heroicons/react/24/solid";

interface NavItemProps {
  href: string;
  icon: JSX.Element;
  label: string;
  isOpen: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon, label, isOpen }) => (
  <li>
    <Link
      href={href}
      className="flex items-center space-x-4 p-3 hover:text-primary-600 rounded-lg transition"
    >
      <span className="text-xl">{icon}</span>
      {isOpen && <span>{label}</span>}
    </Link>
  </li>
);

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="absolute text-black left-0  bg-white  ">

      <ul className="flex flex-col  py-5 w-72"></ul>
      <nav className="flex flex-col h-full">
        <ul>
        <img  src="/logo/login-logo.png" alt="logo" className="w-10 ml-8 h-10 " />

          <NavItem
            href="/admin"
            icon={<HomeIcon />}
            label="Admin Dashboard"
            isOpen={isOpen}
          />

          <NavItem
            href="/admin/kyc"
            icon={<AdjustmentsHorizontalIcon />}
            label="Kyc verification"
            isOpen={isOpen}
          />
          <NavItem
            href="/admin/insights"
            icon={<ServerIcon />}
            label="Insights"
            isOpen={isOpen}
          />
          <NavItem
            href="/admin/transaction"
            icon={<CurrencyRupeeIcon />}
            label="Transaction"
            isOpen={isOpen}
          />

          <NavItem
            href="/admin/settings"
            icon={<BoltIcon />}
            label="Settings"
            isOpen={isOpen}
          />
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
