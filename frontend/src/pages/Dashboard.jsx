import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import SidebarCol from "@/myComponents/common/Sidebar";

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="relative flex">
      <SidebarCol />

      <div className="mt-16 flex-1 overflow-auto items-center justify-center flex">
        <div className="mx-auto w-11/12 max-w-[1000px] h-[90%]">
          <Outlet />
          
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
