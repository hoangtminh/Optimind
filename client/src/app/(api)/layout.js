import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app/app-sidebar";
import { Header } from "@/components/app/header";
import { TasksProvider } from "@/hooks/use-task";
import { DashboardProvider } from "@/hooks/use-dashboard";
import { StudyProvider } from "@/hooks/use-study";

export default function DashboardLayout({ children }) {
	return (
		<TasksProvider>
			<StudyProvider>
				<DashboardProvider>
					<SidebarProvider>
						<div className="flex min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
							<AppSidebar />
							<SidebarInset>
								<div className="flex-1 flex flex-col">
									<Header />
									<main className="flex-1 px-6 pt-3 pb-4">
										{children}
									</main>
								</div>
							</SidebarInset>
						</div>
					</SidebarProvider>
				</DashboardProvider>
			</StudyProvider>
		</TasksProvider>
	);
}
