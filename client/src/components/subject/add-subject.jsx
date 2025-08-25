import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useSubject } from "@/hooks/use-subject";

const AddSubject = () => {
	const {
		newSubjectData,
		isAddSubjectDialogOpen,
		setIsAddSubjectDialogOpen,
		setEditingSubject,
		setNewSubjectData,
		addSubject,
	} = useSubject();

	const handleAddSubject = () => {
		addSubject(newSubjectData);
		setNewSubjectData({
			name: "",
			color: "#228B22",
		});
	};

	return (
		<Dialog
			open={isAddSubjectDialogOpen}
			onOpenChange={setIsAddSubjectDialogOpen}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Chỉnh sửa Subject</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					<div className="flex flex-row gap-3">
						<div>
							<label className="block text-base font-medium text-gray-700 mb-2">
								Tên Subject
							</label>
							<Input
								placeholder="Tên Subject..."
								value={newSubjectData.name}
								onChange={(e) =>
									setNewSubjectData((value) => {
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
								value={newSubjectData.color}
								onChange={(e) =>
									setNewSubjectData((value) => {
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
							onClick={handleAddSubject}
						>
							Add
						</Button>
						<Button
							variant="outline"
							onClick={() => {
								setIsAddSubjectDialogOpen(false);
								setEditingSubject(null);
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

export default AddSubject;
