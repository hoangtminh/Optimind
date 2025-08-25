"use client";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useStudy } from "@/hooks/use-study-session";
import { useSubject } from "@/hooks/use-subject";
import React, { useState } from "react";

const SubjectSelection = () => {
	const { availableSubjects } = useSubject();
	const { selectedSubjects, setSelectedSubjects } = useStudy();

	const isSubjectSeleted = (id) => {
		return selectedSubjects.some(
			(selectedSubject) => selectedSubject.id === id
		);
	};

	return (
		<div>
			<Label className="text-md font-medium mb-3 block">
				Môn học (tùy chọn)
			</Label>
			<div className="flex flex-wrap gap-1.5">
				{availableSubjects.map((subject) => (
					<Badge
						key={subject.id}
						variant={
							isSubjectSeleted(subject.id) ? "default" : "outline"
						}
						className="cursor-pointer"
						style={{
							backgroundColor: isSubjectSeleted(subject.id)
								? subject.color
								: "white",
							borderColor: subject.color,
							color: isSubjectSeleted(subject.id)
								? "white"
								: subject.color,
						}}
						onClick={() => {
							setSelectedSubjects((prev) =>
								isSubjectSeleted(subject.id)
									? prev.filter(
											(prevSubject) =>
												prevSubject.id !== subject.id
									  )
									: [...prev, subject]
							);
						}}
					>
						{subject.name}
					</Badge>
				))}
			</div>
		</div>
	);
};

export default SubjectSelection;
