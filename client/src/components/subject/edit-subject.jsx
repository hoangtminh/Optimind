import React, { useEffect, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useSubject } from "@/hooks/use-subject";

const EditSubject = () => {
	const {
		editingSubject,
		isEditSubjectDialogOpen,
		setIsEditSubjectDialogOpen,

		deleteSubject,
		updateSubject,
	} = useSubject();

	const [newSubjectData, setNewSubjectData] = useState({
		name: editingSubject.name,
		color: editingSubject.color,
	});

	useEffect(() => {
		setNewSubjectData({
			name: editingSubject.name,
			color: editingSubject.color,
		});
	}, [editingSubject]);

	const handleUpdateSubject = () => {
		updateSubject(editingSubject._id, newSubjectData);
		setIsEditSubjectDialogOpen(false);
		setNewSubjectData({ name: "", color: "" });
	};

	const handleDeleteSubject = () => {
		deleteSubject(editingTag._id);
		setIsEditSubjectDialogOpen(false);
		setNewSubjectData({ name: "", color: "" });
	};

	return (
		<Dialog
			open={isEditSubjectDialogOpen}
			onOpenChange={setIsEditSubjectDialogOpen}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Chỉnh sửa Subject</DialogTitle>
					<DialogDescription>
						Chỉnh sửa môn học phù hợp
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-4">
					<div className="flex flex-row gap-3">
						<div className="w-auto">
							<label className="block text-sm font-medium text-gray-700 mb-2">
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
						<div className="w-auto">
							<label className="block text-sm font-medium text-gray-700 mb-2">
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
							className={"bg-blue-500 hover:bg-blue-600 "}
							onClick={handleUpdateSubject}
						>
							Update
						</Button>
						<Button
							variant="destructive"
							onClick={handleDeleteSubject}
						>
							Delete
						</Button>
						<Button
							variant="outline"
							onClick={() => setIsEditSubjectDialogOpen(false)}
						>
							Hủy
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default EditSubject;
