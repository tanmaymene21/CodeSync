"use client";
import React from "react";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import { Navbarui } from "../ui/Navbarui";

export const Navbar = () => {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "About",
      link: "/about",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Faqs",
      link: "/faqs",
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];

  return (
    <div className="relative w-full">
      <Navbarui navItems={navItems} />
    </div>
  );
}
