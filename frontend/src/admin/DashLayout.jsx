import { Outlet } from "react-router-dom";
import DashSidebar from "./DashSidebar";
import DashHeader from "./DashHeader";

export default function DashLayout() {
  return (
    <div className="flex h-screen">
      {/* Admin Sidebar */}
      <DashSidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Admin Header */}
        <DashHeader />
        
        {/* Main content area - will render nested routes */}
        <main className="flex-1 p-4 overflow-y-auto md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}