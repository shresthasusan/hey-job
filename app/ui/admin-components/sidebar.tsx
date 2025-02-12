"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, Briefcase,AlignVerticalJustifyCenter, LetterTextIcon, MessageSquare, Settings, Menu } from "lucide-react";
import React from "react";

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
          <NavItem 
          href="/admin" 
          icon={<Home />}
           label="Admin Dashboard"
            isOpen={isOpen} />
            
          
          <NavItem
            href="/admin/kyc"
            icon={<AlignVerticalJustifyCenter />}
            label="Kyc verification"
            isOpen={isOpen}
          />
          <NavItem
            href="/admin/insights"
            icon={<LetterTextIcon />}
            label="Insights"
            isOpen={isOpen}
          />
          <NavItem
            href="/admin/transaction"
            icon={<Briefcase />}
            label="Transaction"
            isOpen={isOpen}
          />
         
          <NavItem
            href="/admin/settings"
            icon={<Settings />}
            label="Settings"
            isOpen={isOpen}
          />
        </ul>
      </nav>
    </div>
  );
};


export default Sidebar;
