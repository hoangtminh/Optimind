"use client";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useStudy } from "@/hooks/use-study-session";
import { useSubject } from "@/hooks/use-subject";
import React from "react";

const SubjectSelection = () => {
	const { subjects } = useSubject();
	const { sessionSubjects, setSessionSubjects } = useStudy();

	const isSubjectSeleted = (id) => {
		return sessionSubjects.some(
			(selectedSubject) => selectedSubject._id === id
		);
	};

	return (
		<div>
			<Label className="text-md font-medium mb-3 block">
				Môn học (tùy chọn)
			</Label>
			<div className="flex flex-wrap gap-1.5">
				{subjects.map((subject) => (
					<Badge
						key={subject._id}
						variant={
							isSubjectSeleted(subject._id)
								? "default"
								: "outline"
						}
						className="cursor-pointer"
						style={{
							backgroundColor: isSubjectSeleted(subject._id)
								? subject.color
								: "white",
							borderColor: subject.color,
							color: isSubjectSeleted(subject._id)
								? "white"
								: subject.color,
						}}
						onClick={() => {
							setSessionSubjects((prev) =>
								isSubjectSeleted(subject._id)
									? prev.filter(
											(prevSubject) =>
												prevSubject._id !== subject._id
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
