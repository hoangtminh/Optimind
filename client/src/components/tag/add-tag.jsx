import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useTag } from "@/hooks/use-tag";

const AddTag = () => {
	const { createTag, isAddTagDialogOpen, setIsAddTagDialogOpen } = useTag();

	const [newTagData, setNewTagData] = useState({
		name: "",
		color: "#228B22",
	});

	const handleAddTag = () => {
		createTag(newTagData);
		setIsAddTagDialogOpen(false);
		setNewTagData({
			name: "",
			color: "#228B22",
		});
	};

	return (
		<Dialog open={isAddTagDialogOpen} onOpenChange={setIsAddTagDialogOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Tạo tag mới</DialogTitle>
					<DialogDescription>
						Tag mới quản lý việc học
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-4">
					<div className="flex flex-row gap-3">
						<div>
							<label className="block text-base font-medium text-gray-700 mb-2">
								Tên tag
							</label>
							<Input
								placeholder="Tên tag..."
								value={newTagData.name}
								onChange={(e) =>
									setNewTagData((value) => {
										return {
											...value,
											name: e.target.value,
										};
									})
								}
							/>
						</div>
						<div>
							<label className="block text-base font-medium text-gray-700 mb-2">
								Màu sắc
							</label>
							<Input
								type="color"
								value={newTagData.color}
								onChange={(e) =>
									setNewTagData((value) => {
										return {
											...value,
											color: e.target.value,
										};
									})
								}
								className="w-full h-10"
							/>
						</div>
					</div>

					<div className="flex gap-2 justify-end">
						<Button
							className={"bg-blue-500 hover:bg-blue-600"}
							onClick={handleAddTag}
						>
							Add
						</Button>
						<Button
							variant="outline"
							onClick={() => {
								setIsAddTagDialogOpen(false);
							}}
						>
							Cancel
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AddTag;
