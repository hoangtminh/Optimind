import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app/app-sidebar";
import { Header } from "@/components/app/header";

export default function DashboardLayout({ children }) {
	return (
		<SidebarProvider>
			<div className="flex min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
				<AppSidebar />
				<SidebarInset>
					<div className="flex-1 flex flex-col">
						<Header />
						<main className="flex-1 p-6">{children}</main>
					</div>
				</SidebarInset>
			</div>
		</SidebarProvider>
	);
}
