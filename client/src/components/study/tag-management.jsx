import React, { useState } from "react";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ChevronLeft,
	ChevronRight,
	Edit2,
	Plus,
	Search,
	TagIcon,
	Trash2,
} from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useStudy } from "@/hooks/use-study";
import TagTableRow from "./tag-table-row";

const TagManagement = () => {
	const { availableTags, tagPage, addTag, updateTag, deleteTag, setTagPage } =
		useStudy();

	const [newTagData, setNewTagData] = useState({
		name: "",
		color: "#228B22",
	});

	const [tagSearch, setTagSearch] = useState("");
	const filteredTags = availableTags.filter((tag) =>
		tag.name.toLowerCase().includes(tagSearch.toLowerCase())
	);
	const paginatedTags = filteredTags.slice(tagPage * 5, (tagPage + 1) * 5);

	const handleAddTag = () => {
		addTag(newTagData);
		setNewTagData({
			name: "",
			color: "#228B22",
		});
	};

	return (
		<Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200">
			<CardHeader>
				<CardTitle className="flex flex-row gap-2 items-center text-lg text-orange-700">
					<TagIcon className="w-5 h-5" />
					Quản lý Tags
				</CardTitle>
				<div className="flex gap-2 mt-3">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 border-orange-200" />
						<Input
							placeholder="Tìm kiếm tags..."
							value={tagSearch}
							onChange={(e) => setTagSearch(e.target.value)}
							className="pl-10 border-orange-200 shadow-md"
						/>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{/* Add New Tag */}
					<div className="flex gap-2">
						<Input
							placeholder="Tên tag mới..."
							value={newTagData.name}
							onChange={(e) =>
								setNewTagData((value) => {
									return { ...value, name: e.target.value };
								})
							}
							className="flex-1 border-orange-200 shadow-md"
						/>
						<input
							type="color"
							value={newTagData.color}
							onChange={(e) =>
								setNewTagData((value) => {
									return { ...value, color: e.target.value };
								})
							}
							className="h-auto px-1 border border-slate-200 cursor-pointer"
						/>
						<Button
							onClick={handleAddTag}
							size="sm"
							className={
								"h-auto bg-orange-400 hover:bg-orange-500 hover:cursor-pointer"
							}
						>
							<Plus className="h-4 w-4" />
						</Button>
					</div>

					{/* Tags Table */}
					<div className="border rounded-t-lg bg-orange-300 border-orange-300">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-8"></TableHead>
									<TableHead>Tên</TableHead>
									<TableHead className="w-20">
										Thao tác
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody className={"bg-orange-100"}>
								{paginatedTags.map((tag) => (
									<TagTableRow
										tag={tag}
										newTagData={newTagData}
										setNewTagData={setNewTagData}
										deleteTag={deleteTag}
									/>
								))}
							</TableBody>
						</Table>
					</div>

					{/* Tag Pagination */}
					<div className="flex justify-between items-center">
						<span className="pl-1 text-sm text-slate-700">
							{tagPage * 10 + 1}-
							{Math.min((tagPage + 1) * 10, filteredTags.length)}{" "}
							của {filteredTags.length}
						</span>
						<div className="flex gap-1">
							<Button
								variant="ghost"
								size="sm"
								onClick={() =>
									setTagPage(Math.max(0, tagPage - 1))
								}
								disabled={tagPage === 0}
								className={
									"hover:cursor-pointer hover:bg-orange-300"
								}
							>
								<ChevronLeft className="h-4 w-4" />
							</Button>
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setTagPage(tagPage + 1)}
								disabled={
									(tagPage + 1) * 5 >= filteredTags.length
								}
								className={
									"hover:cursor-pointer hover:bg-orange-300"
								}
							>
								<ChevronRight className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default TagManagement;
