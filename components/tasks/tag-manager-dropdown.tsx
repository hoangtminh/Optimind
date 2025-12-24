import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
	DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useTask } from "@/hooks/useTask";
import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { TagIcon, Trash2 } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

const TagManagerDropdown = () => {
	const { tags } = useTask();
	const [newTagName, setNewTagName] = useState("");
	const [selectedColor, setSelectedColor] = useState("bg-blue-500");

	const colors = [
		{ name: "Blue", class: "bg-blue-500" },
		{ name: "Green", class: "bg-green-500" },
		{ name: "Red", class: "bg-red-500" },
		{ name: "Yellow", class: "bg-yellow-500" },
		{ name: "Purple", class: "bg-purple-500" },
	];

	const onAdd = (e: React.MouseEvent) => {
		e.preventDefault();
		if (!newTagName.trim()) return;
		// handleAddGlobalTag(newTagName, selectedColor);
		setNewTagName("");
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className="bg-white/10 border-white/20 text-white hover:bg-white/20"
				>
					<TagIcon size={18} className="mr-2" /> Tag
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-64 bg-black/80 backdrop-blur-md border-white/20 text-white"
				align="end"
			>
				<DropdownMenuLabel>Quản lý Tag</DropdownMenuLabel>
				<DropdownMenuSeparator className="bg-white/10" />
				<ScrollArea className="h-40 px-1">
					{tags.length === 0 ? (
						<p className="text-xs text-center py-4 text-gray-400">
							Trống
						</p>
					) : (
						tags.map((tag) => (
							<div
								key={tag.id}
								className="flex items-center justify-between p-2 rounded hover:bg-white/10"
							>
								<div className="flex items-center gap-2">
									<div
										className={cn(
											"w-3 h-3 rounded-full",
											tag.color
										)}
									/>
									<span className="text-sm">{tag.name}</span>
								</div>
								<Button
									variant="ghost"
									size="icon"
									className="h-6 w-6 text-red-400"
									onClick={
										() => {}
										// handleDeleteGlobalTag(tag.id)
									}
								>
									<Trash2 size={14} />
								</Button>
							</div>
						))
					)}
				</ScrollArea>
				<DropdownMenuSeparator className="bg-white/10" />
				<div className="p-2 space-y-2">
					<Input
						placeholder="Tên tag..."
						value={newTagName}
						onChange={(e) => setNewTagName(e.target.value)}
						className="h-8 text-xs bg-white/10"
					/>
					<div className="flex gap-1 justify-between">
						{colors.map((c) => (
							<button
								key={c.class}
								className={cn(
									"w-5 h-5 rounded-full",
									c.class,
									selectedColor === c.class &&
										"ring-1 ring-white"
								)}
								onClick={() => setSelectedColor(c.class)}
							/>
						))}
					</div>
					<Button
						size="sm"
						className="w-full h-8 text-xs bg-blue-600"
						onClick={onAdd}
					>
						Thêm Tag
					</Button>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default TagManagerDropdown;
