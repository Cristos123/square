"use client";

import LiveChatCard from "@/components/support/livechatcard";
import { ToastContainer } from "react-toastify";
function Layout({ children }) {
  return (
    <main className="flex min-h-screen flex-col p-8   lg:p-24 bg-white">
      <ToastContainer hideProgressBar={true} limit={1} autoClose={1000} />
      {children}
      <LiveChatCard />
    </main>
  );
}

export default Layout;
