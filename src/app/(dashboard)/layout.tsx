"use client";
import React, { ReactNode, useState } from "react";
import MainSidebar from "../components/MainSidebar";

const DashboardLayout = ({
  children,
}: {
  children: ReactNode;
  projects: ReactNode;
}) => {
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <div
      className={`grid min-h-screen w-full lg:grid-cols-[${
        openSidebar ? "280px_1fr" : "70px_1fr"
      }]`}
    >
      <MainSidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <div className="px-8 py-4">{children}</div>
    </div>
  );
};

export default DashboardLayout;
