"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Bell, Search, Sun } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function Header() {
	return (
		<header className="flex sticky w-full top-0 h-16 z-1 items-center gap-4 border-b border-gray-100 bg-white backdrop-blur-md px-6">
			<SidebarTrigger className="hover:bg-blue-50 hover:text-blue-600 transition-colors" />

			<div className="flex-1 flex items-center gap-4">
				<div className="relative max-w-md flex-1">
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
					<Input
						placeholder="Tìm kiếm..."
						className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/70"
					/>
				</div>
			</div>

			<div className="flex items-center gap-3">
				<Button
					variant="ghost"
					size="icon"
					className="relative hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
				>
					<Sun className="h-4 w-4" />
				</Button>

				<Button
					variant="ghost"
					size="icon"
					className="relative hover:bg-blue-50 hover:text-blue-600 transition-colors"
				>
					<Bell className="h-4 w-4" />
					<Badge
						variant="destructive"
						className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-red-500 to-pink-500"
					>
						3
					</Badge>
				</Button>
			</div>
		</header>
	);
}
