"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Search from "@/components/Search";
import "./app.css";

// Shared shell for every logged-in style page: sidebar + search bar.
export default function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isPlayer = pathname.startsWith("/player");

  return (
    <div className={`wrapper ${isPlayer ? "wrapper--player" : ""}`}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="wrapper__main">
        <Search onMenuClick={() => setSidebarOpen(true)} />
        <main>{children}</main>
      </div>
    </div>
  );
}
