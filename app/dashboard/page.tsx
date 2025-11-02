import { Sidebar } from "../Components/Sidebar";
import Dashboard from "../Components/Dashboard";

export default function DashboardPage() {
    return (
        <main className="grid gap-4 p-4">
                <Sidebar />
                <Dashboard />   
            </main>
    )
}