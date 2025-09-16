"use client";

import {
	Calendar,
	Clock,
	Home,
	Settings,
	Target,
	TrendingUp,
	Bell,
	Brain,
	Bluetooth,
	Trophy,
	Medal,
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
import { cn } from "@/lib/utils";
import SidebarUser from "./sidebar-user";

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
		title: "Trò chơi",
		url: "/gamification",
		icon: Trophy,
		color: "text-green-600",
		bgColor: "bg-green-50",
	},
	{
		title: "Bảng xếp hạng",
		url: "/ranking",
		icon: Medal,
		color: "text-green-600",
		bgColor: "bg-green-50",
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
								EduFocus
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
				<SidebarUser />
			</SidebarFooter>
		</Sidebar>
	);
}
