import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
	DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, FolderOpen, Plus } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { useProject } from "@/hooks/useProject";

import CreateProject from "./create-project";
import { useEffect } from "react";

const ProjectSelector = () => {
	const {
		projects,
		selectedProjectId,
		setSelectedProjectId,
		setIsCreateProjectOpen,
	} = useProject();

	const currentProjectName =
		projects.find((p) => p.id === selectedProjectId)?.name || "Chọn dự án";

	return (
		<div className="flex items-center gap-2">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						className="text-xl font-bold text-neutral-800 px-2 gap-2"
					>
						{currentProjectName}
						<ChevronDown size={20} className="text-gray-400" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="w-64 max-h-80 bg-black/70 backdrop-blur-md border-white/20 text-white"
					align="start"
				>
					<DropdownMenuLabel className="flex justify-between">
						<div className="flex items-center gap-2">
							<FolderOpen size={16} /> Danh sách Dự án
						</div>
						<Button
							size="icon"
							variant="secondary"
							className="h-6 w-6 shrink-0 cursor-pointer"
							onClick={() => setIsCreateProjectOpen(true)}
						>
							<Plus size={14} />
						</Button>
					</DropdownMenuLabel>
					<DropdownMenuSeparator className="bg-white/10" />

					<ScrollArea className="h-40">
						{projects.map((p) => (
							<DropdownMenuItem
								key={p.id}
								onClick={() => setSelectedProjectId(p.id)}
								className={cn(
									"cursor-pointer transition-colors my-1",
									selectedProjectId === p.id
										? "bg-white/20 text-blue-400"
										: "hover:bg-white/10"
								)}
							>
								{p.name}
							</DropdownMenuItem>
						))}
					</ScrollArea>
				</DropdownMenuContent>
			</DropdownMenu>
			<CreateProject />
		</div>
	);
};

export default ProjectSelector;
