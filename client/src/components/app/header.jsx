"use client";

import { Bell, Search, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "../ui/sidebar";

export function Header() {
	return (
		<header className="flex sticky w-full top-0 h-16 z-1 items-center justify-between gap-4 border-b border-gray-100 bg-white backdrop-blur-md px-6">
			<div className="flex flex-row gap-5 items-center">
				<SidebarTrigger className="hover:bg-blue-50 hover:text-blue-600 transition-colors" />
				{/* Search */}
				<div className="flex items-center gap-4 flex-1 w-md">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
						<Input
							placeholder="Tìm kiếm..."
							className="pl-10 bg-slate-50 border-slate-200 focus:bg-white"
						/>
					</div>
				</div>
			</div>
			{/* Right side */}
			<div className="flex items-center gap-5">
				{/* Notifications */}
				<Button variant="ghost" size="sm" className="relative">
					<Bell className="h-4 w-4" />
					<Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 hover:bg-red-500">
						3
					</Badge>
				</Button>

				{/* Settings */}
				<Button variant="ghost" size="sm">
					<Settings className="h-4 w-4" />
				</Button>

				{/* User Menu */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							className="relative h-8 w-8 rounded-full"
						>
							<Avatar className="h-8 w-8">
								<AvatarImage src="/placeholder.svg?height=32&width=32" />
								<AvatarFallback className="bg-indigo-100 text-indigo-600 hover:bg-indigo-200">
									<User className="h-4 w-4" />
								</AvatarFallback>
							</Avatar>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-56"
						align="end"
						forceMount
					>
						<DropdownMenuLabel className="font-normal">
							<div className="flex flex-col space-y-1">
								<p className="text-sm font-medium leading-none">
									Học viên
								</p>
								<p className="text-xs leading-none text-muted-foreground">
									student@optimind.com
								</p>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<User className="mr-2 h-4 w-4" />
							<span>Hồ sơ</span>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Settings className="mr-2 h-4 w-4" />
							<span>Cài đặt</span>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<span>Đăng xuất</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}
