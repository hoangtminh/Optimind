"use client";

import React, { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { useTag } from "@/hooks/use-tag";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, Edit2, Trash2 } from "lucide-react";

const TagTable = ({ tagSearch }) => {
	const {
		availableTags,
		setIsEditTagDialogOpen,
		setEditingTag,
		setNewTagData,
		deleteTag,
	} = useTag();

	const [tagPage, setTagPage] = useState(0);

	const filteredTags = availableTags.filter((tag) =>
		tag.name.toLowerCase().includes(tagSearch.toLowerCase())
	);
	const paginatedTags = filteredTags.slice(tagPage * 5, (tagPage + 1) * 5);

	return (
		<div className="space-y-3">
			<div className="border rounded-t-lg bg-orange-300 border-orange-300">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-8"></TableHead>
							<TableHead>Tên</TableHead>
							<TableHead className="w-20">Thao tác</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className={"bg-orange-100"}>
						{paginatedTags.map((tag) => (
							<TableRow
								key={tag.id}
								className={"hover:bg-orange-200"}
							>
								<TableCell>
									<div
										className="w-4 h-4 rounded-full border border-slate-200"
										style={{
											backgroundColor: tag.color,
										}}
									/>
								</TableCell>
								<TableCell>
									<span className="text-sm">{tag.name}</span>
								</TableCell>
								<TableCell>
									<div className="flex gap-1">
										<Button
											variant="ghost"
											size="sm"
											onClick={() => {
												setIsEditTagDialogOpen(
													() => true
												);
												setEditingTag(tag.id);
												setNewTagData({
													name: tag.name,
													color: tag.color,
												});
											}}
											className="h-8 w-8 p-0 hover:bg-orange-300"
										>
											<Edit2 className="h-3 w-3" />
										</Button>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => deleteTag(tag.id)}
											className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-orange-300"
										>
											<Trash2 className="h-3 w-3" />
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			<div className="flex justify-between items-center">
				<span className="pl-1 text-sm text-slate-700">
					{tagPage * 5 + 1}-
					{Math.min((tagPage + 1) * 5, filteredTags.length)} của{" "}
					{filteredTags.length}
				</span>
				<div className="flex gap-1">
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setTagPage(Math.max(0, tagPage - 1))}
						disabled={tagPage === 0}
						className={"hover:cursor-pointer hover:bg-orange-300"}
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setTagPage(tagPage + 1)}
						disabled={(tagPage + 1) * 5 >= filteredTags.length}
						className={"hover:cursor-pointer hover:bg-orange-300"}
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default TagTable;
