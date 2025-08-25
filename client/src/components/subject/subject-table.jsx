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
import { useSubject } from "@/hooks/use-subject";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, Edit2, Trash2 } from "lucide-react";

const SubjectTable = ({ subjectSearch }) => {
	const {
		availableSubjects,
		setIsEditSubjectDialogOpen,
		setEditingSubject,
		setNewSubjectData,
		deleteSubject,
	} = useSubject();

	const [subjectPage, setSubjectPage] = useState(0);

	const filteredSubjects = availableSubjects.filter(
		(subject) =>
			// subject.name.toLowerCase().includes(subjectSearch.toLowerCase())
			true
	);
	const paginatedSubjects = filteredSubjects.slice(
		subjectPage * 5,
		(subjectPage + 1) * 5
	);

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
						{paginatedSubjects.map((subject) => (
							<TableRow
								key={subject.id}
								className={"hover:bg-orange-200"}
							>
								<TableCell>
									<div
										className="w-4 h-4 rounded-full border border-slate-200"
										style={{
											backgroundColor: subject.color,
										}}
									/>
								</TableCell>
								<TableCell>
									<span className="text-sm">
										{subject.name}
									</span>
								</TableCell>
								<TableCell>
									<div className="flex gap-1">
										<Button
											variant="ghost"
											size="sm"
											onClick={() => {
												setIsEditSubjectDialogOpen(
													() => true
												);
												setEditingSubject(subject.id);
												setNewSubjectData({
													name: subject.name,
													color: subject.color,
												});
											}}
											className="h-8 w-8 p-0 hover:bg-orange-300"
										>
											<Edit2 className="h-3 w-3" />
										</Button>
										<Button
											variant="ghost"
											size="sm"
											onClick={() =>
												deleteSubject(subject.id)
											}
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
					{subjectPage * 5 + 1}-
					{Math.min((subjectPage + 1) * 5, filteredSubjects.length)}{" "}
					của {filteredSubjects.length}
				</span>
				<div className="flex gap-1">
					<Button
						variant="ghost"
						size="sm"
						onClick={() =>
							setSubjectPage(Math.max(0, subjectPage - 1))
						}
						disabled={subjectPage === 0}
						className={"hover:cursor-pointer hover:bg-orange-300"}
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setSubjectPage(subjectPage + 1)}
						disabled={
							(subjectPage + 1) * 5 >= filteredSubjects.length
						}
						className={"hover:cursor-pointer hover:bg-orange-300"}
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default SubjectTable;
