"use client";

import React, { useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Edit2, Trash2 } from "lucide-react";

const TagTableRow = ({ tag, newTagData, setNewTagData, deleteTag }) => {
	const [editingTag, setEditingTag] = useState(false);

	return (
		<TableRow key={tag.id} className={"hover:bg-orange-200"}>
			<TableCell>
				<div
					className="w-4 h-4 rounded-full border border-slate-200"
					style={{
						backgroundColor: tag.color,
					}}
				/>
			</TableCell>
			<TableCell>
				{editingTag === tag.id ? (
					<Input
						value={newTagData.name}
						onChange={(e) =>
							setNewTagData((value) => {
								return {
									...value,
									name: e.target.value,
								};
							})
						}
						className="h-8"
					/>
				) : (
					<span className="text-sm">{tag.name}</span>
				)}
			</TableCell>
			<TableCell>
				<div className="flex gap-1">
					<Button
						variant="ghost"
						size="sm"
						onClick={() => {
							setEditingTag(tag.id);
							setNewTagData({ name: tag.name, color: tag.color });
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
	);
};

export default TagTableRow;
