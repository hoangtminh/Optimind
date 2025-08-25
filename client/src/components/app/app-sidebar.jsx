"use client";

import {
	Calendar,
	Clock,
	Home,
	Settings,
	Target,
	TrendingUp,
	Bell,
	LogOut,
	User,
	Brain,
	Bluetooth,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarHeader,
	useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const menuItems = [
	{
		title: "Trang chủ",
		url: "/dashboard",
		icon: Home,
		color: "text-blue-600",
		bgColor: "bg-blue-50",
	},
	{
		title: "Thiết bị",
		url: "/device",
		icon: Bluetooth,
		color: "text-indigo-600",
		bgColor: "bg-indigo-50",
	},
	{
		title: "Theo dõi học tập",
		url: "/study",
		icon: Clock,
		color: "text-green-600",
		bgColor: "bg-green-50",
	},
	{
		title: "Lịch sử & Tiến bộ",
		url: "/progress",
		icon: TrendingUp,
		color: "text-cyan-600",
		bgColor: "bg-cyan-50",
	},
	{
		title: "Mục tiêu",
		url: "/goals",
		icon: Target,
		color: "text-amber-600",
		bgColor: "bg-amber-50",
	},
	{
		title: "Thông báo",
		url: "/notifications",
		icon: Bell,
		color: "text-red-600",
		bgColor: "bg-red-50",
	},
	{
		title: "Lịch học",
		url: "/calendar",
		icon: Calendar,
		color: "text-purple-600",
		bgColor: "bg-purple-50",
	},
	{
		title: "Cài đặt",
		url: "/settings",
		icon: Settings,
		color: "text-gray-600",
		bgColor: "bg-gray-50",
	},
];

export function AppSidebar() {
	const pathname = usePathname();
	const { open } = useSidebar();

	return (
		<Sidebar
			collapsible="icon"
			className={`border-r-0 shadow-lg transition-all duration-200`}
		>
			<SidebarHeader className="border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
				<div className="flex items-center gap-3 px-2.5 py-1.5">
					<div className="relative">
						<div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl blur-sm opacity-75" />
						<div className="relative bg-gradient-to-r from-indigo-500 to-cyan-500 p-2 rounded-xl">
							<Brain className="h-5 w-5 text-white" />
						</div>
					</div>
					{open && (
						<div className="flex flex-col">
							<span className="font-bold text-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
								Optimind
							</span>
						</div>
					)}
				</div>
			</SidebarHeader>

			<SidebarContent className="bg-gradient-to-b from-blue-400 from-90% to-indigo-300">
				<SidebarGroup>
					<SidebarGroupLabel className="text-white text-lg my-1 font-semibold">
						Menu chính
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu
							className={`space-y-1.5 px-2 ${
								!open && "items-center"
							}`}
						>
							{menuItems.map((item) => {
								const isActive = pathname === item.url;
								return (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton
											asChild
											isActive={isActive}
											className={cn(
												"w-full transition-all duration-100 hover:scale-105 h-11 p-0",
												!open && "justify-center",
												isActive
													? `shadow-md border border-gray-200`
													: "hover:bg-gray-200 text-gray-700"
											)}
										>
											<Link href={item.url}>
												<div
													className={cn(
														"flex px-3 h-full items-center justify-left gap-3 text-white text-base font-medium ",
														open && "w-full",
														isActive
															? `${item.color} ${item.bgColor}`
															: "hover:text-gray-700"
													)}
												>
													<item.icon className="h-6 w-6" />
													{open && item.title}
												</div>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter className="bg-indigo-300">
				<div
					className={`flex items-center gap-3 py-3 px-2 rounded-lg bg-white/60 backdrop-blur-sm shadow-sm`}
				>
					<Avatar className="h-10 w-10 ring-2 ring-blue-200">
						<AvatarImage src="/placeholder.svg" />
						<AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
							<User className="h-5 w-5" />
						</AvatarFallback>
					</Avatar>
					{open && (
						<>
							<div className="flex-1 min-w-0">
								<p className="text-sm font-semibold text-gray-800 truncate">
									Người dùng
								</p>
								<p className="text-xs text-gray-500 truncate">
									user@example.com
								</p>
							</div>
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8 hover:bg-red-50 hover:text-red-600 transition-colors"
							>
								<LogOut className="h-4 w-4" />
							</Button>
						</>
					)}
				</div>
			</SidebarFooter>
		</Sidebar>
	);
}
