"use client";

import React, { ReactNode, useState } from "react";
import MainSidebar from "../components/MainSidebar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <>
      <div className={`flex min-h-screen w-full`}>
        <div style={{ width: openSidebar ? "290px" : "60px" }}>
          <MainSidebar
            openSidebar={openSidebar}
            setOpenSidebar={setOpenSidebar}
          />
        </div>
        <div className="px-8 py-4 w-full">{children}</div>
      </div>
    </>
  );
};

export default DashboardLayout;
