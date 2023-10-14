"use client";

import LiveChatCard from "@/components/support/livechatcard";
import { ToastContainer } from "react-toastify";
function Layout({ children }) {
  return (
    <main className="flex min-h-screen flex-col   lg:p-24 bg-white">
      <ToastContainer hideProgressBar={true} limit={1} autoClose={1000} />
      {children}
    </main>
  );
}

export default Layout;
