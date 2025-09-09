import { Badge } from "@/components/ui/badge";
import { useStudy } from "@/hooks/use-study-session";
import { useSubject } from "@/hooks/use-subject";
import { useTag } from "@/hooks/use-tag";
import React from "react";

const SubjectAndTags = () => {
	const { sessionData } = useStudy();
	const { tags } = useTag();
	const { subjects } = useSubject();

	const sessionTags = tags.filter((tag) =>
		sessionData.tags.some((sessionTag) => sessionTag._id === tag._id)
	);

	const sessionSubjects = subjects.filter((subject) =>
		sessionData.subjects.some(
			(sessionSubject) => sessionSubject._id === subject._id
		)
	);

	return (
		<div className="flex flex-col p-3 gap-4 bg-white rounded-lg shadow-lg border-gray-400/70">
			<div className="flex items-center gap-2">
				<span className="text-nowrap font-medium text-gray-700">
					Môn học:
				</span>
				{sessionSubjects.length > 0 ? (
					<div className="flex flex-row flex-wrap gap-2 text-lg font-semibold">
						{sessionSubjects?.map((subject) => (
							<Badge
								key={subject._id}
								style={{
									backgroundColor: subject.color,
									color: "white",
								}}
							>
								{subject.name}
							</Badge>
						))}
					</div>
				) : (
					"No subject"
				)}
			</div>
			<div className="flex items-center gap-2">
				<span className="font-medium text-gray-700">Tags:</span>
				{sessionTags.length > 0 ? (
					<div className="flex flex-wrap gap-2">
						{sessionData.tags.map((tag) => (
							<Badge
								key={tag._id}
								style={{
									backgroundColor: tag.color,
									color: "white",
								}}
							>
								{tag.name}
							</Badge>
						))}
					</div>
				) : (
					"No tags"
				)}
			</div>
		</div>
	);
};

export default SubjectAndTags;
