import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app/app-sidebar";
import { Header } from "@/components/app/header";
import { TasksProvider } from "@/hooks/use-task";
import { DashboardProvider } from "@/hooks/use-dashboard";
import { StudyProvider } from "@/hooks/use-study-session";
import { TagProvider } from "@/hooks/use-tag";
import { SubjectProvider } from "@/hooks/use-subject";
import { AuthProvider } from "@/hooks/use-auth";
import { CameraProvider } from "@/hooks/use-camera";
import { StudyProgressProvider } from "@/hooks/use-study-progress";

export default function DashboardLayout({ children }) {
	return (
		<AuthProvider>
			<TasksProvider>
				<StudyProgressProvider>
					<TagProvider>
						<SubjectProvider>
							<CameraProvider>
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
							</CameraProvider>
						</SubjectProvider>
					</TagProvider>
				</StudyProgressProvider>
			</TasksProvider>
		</AuthProvider>
	);
}
