"use client";

import { useAuth } from "@/hooks/use-auth";
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
import { useSidebar } from "../ui/sidebar";

const SidebarUser = () => {
	const { open } = useSidebar();
	const { state, loading, user, logout } = useAuth();

	if (loading) {
		return null;
	}

	return (
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
							{user?.username}
						</p>
						<p className="text-xs text-gray-500 truncate">
							{user?.email}
						</p>
					</div>
					<Button
						variant="ghost"
						size="icon"
						className="h-8 w-8 hover:bg-red-50 hover:text-red-600 transition-colors"
						onClick={logout}
					>
						<LogOut className="h-4 w-4" />
					</Button>
				</>
			)}
		</div>
	);
};

export default SidebarUser;
