import { Sidebar } from "../Components/Sidebar";
import { TopNav } from "../Components/TopNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Fixed TopNav starting AFTER sidebar */}
      <TopNav />

      {/* Page Content */}
      <main className="pl-[220px] pt-[64px] h-screen overflow-auto bg-gray-50 p-4">
        {children}
      </main>
    </div>
  );
}
