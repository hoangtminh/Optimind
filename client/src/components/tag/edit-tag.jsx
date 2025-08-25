import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useTag } from "@/hooks/use-tag";

const EditTag = () => {
	const {
		newTagData,
		isEditTagDialogOpen,
		setIsEditTagDialogOpen,
		setNewTagData,
	} = useTag();

	const handleUpdateTag = () => {
		setIsEditTagDialogOpen(false);
	};
	const handleDeleteTag = () => {
		setIsEditTagDialogOpen(false);
	};

	return (
		<Dialog
			open={isEditTagDialogOpen}
			onOpenChange={setIsEditTagDialogOpen}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Chỉnh sửa tag</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					<div className="flex flex-row gap-3">
						<div className="w-auto">
							<label className="block text-sm font-medium text-gray-700 mb-2">
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
						<div className="w-auto">
							<label className="block text-sm font-medium text-gray-700 mb-2">
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
							className={"bg-blue-500 hover:bg-blue-600 "}
							onClick={handleUpdateTag}
						>
							Update
						</Button>
						<Button
							variant="destructive"
							onClick={() => {
								handleDeleteTag();
								setIsEditTagDialogOpen(false);
								setEditingTag(null);
							}}
						>
							Delete
						</Button>
						<Button
							variant="outline"
							onClick={() => setIsEditTagDialogOpen(false)}
						>
							Hủy
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default EditTag;
