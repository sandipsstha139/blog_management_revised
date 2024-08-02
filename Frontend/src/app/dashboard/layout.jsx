import DashboardNavbar from "@/components/DashboardLayout/DashboardNavbar";
import DashboardSidebar from "@/components/DashboardLayout/DashboardSidebar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <DashboardSidebar />

      <DashboardNavbar>
        <main className="flex flex-col gap-4 p-4 lg:gap-6">{children}</main>
      </DashboardNavbar>
    </div>
  );
};

export default Layout;
