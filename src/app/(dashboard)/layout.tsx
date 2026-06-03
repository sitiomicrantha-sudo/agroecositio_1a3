"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, Menu, X, Leaf } from "lucide-react";
import Button from "@/components/ui/Button";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Áreas", href: "/areas", icon: Map },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="fixed inset-0 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
          <div className="flex items-center justify-between p-4 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <Leaf className="text-green-600" size={24} />
              <span className="font-bold text-stone-800">Agroecossistio</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 text-stone-400 hover:text-stone-600"
            >
              <X size={20} />
            </button>
          </div>
          <nav className="p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-green-50 text-green-700"
                      : "text-stone-600 hover:bg-stone-100"
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-stone-200">
          <div className="flex items-center gap-2 p-4 border-b border-stone-200">
            <Leaf className="text-green-600" size={24} />
            <span className="font-bold text-stone-800">Agroecossistio</span>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-green-50 text-green-700"
                      : "text-stone-600 hover:bg-stone-100"
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <div className="sticky top-0 z-40 flex items-center gap-4 px-4 py-3 bg-white border-b border-stone-200 lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </Button>
          <div className="flex items-center gap-2">
            <Leaf className="text-green-600" size={20} />
            <span className="font-bold text-stone-800">Agroecossistio</span>
          </div>
        </div>

        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
