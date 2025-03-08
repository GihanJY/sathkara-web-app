import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Sidebar from "@/app/components/sidebar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sathkara Dashboard",
  description: "Manage your inventory easily.",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="flex flex-row">
          <div className="h-screen overflow-hidden">
            <Sidebar />
          </div>
          <div className="h-screen flex-1 flex flex-col">
            {children}
          </div>
      </body>
    </html>
  );
}
