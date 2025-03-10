"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaHome, FaChartBar, FaUser, FaCog, FaDoorClosed } from "react-icons/fa";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("hospitalId");
    router.push("/"); // Ensure correct redirection after logout
  };

  return (
    <div className="p-1 h-screen w-64 bg-blue-50 justify-center">
      {/* Sidebar Header */}
      <div className="flex flex-row w-full items-center justify-start mt-4 mb-10">
        <img className="w-25" src="logo.png" alt="logo" />
      </div>

      {/* Navigation Links */}
      <nav className="space-y-4">
        {/* Home Button */}
        <Link href="/dashboard">
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-300 cursor-pointer">
            <FaHome color="black" size={20} />
            <span className="text-black">Home</span>
          </div>
        </Link>

        {/* Profile Button */}
        <Link href="/dashboard/profile">
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-300 cursor-pointer">
            <FaUser color="black" size={20} />
            <span className="text-black">Profile</span>
          </div>
        </Link>

        {/* Settings Button */}
        <Link href="/dashboard/settings">
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-300 cursor-pointer">
            <FaCog color="black" size={20} />
            <span className="text-black">Settings</span>
          </div>
        </Link>
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-64 flex items-center gap-3 p-3 rounded-lg hover:bg-slate-300 cursor-pointer w-full"
      >
        <FaDoorClosed color="black" size={20} />
        <span className="text-black">Logout</span>
      </button>
    </div>
  );
}