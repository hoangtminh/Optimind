import { Badge } from "@/components/ui/badge";
import { useStudy } from "@/hooks/use-study-session";
import { useSubject } from "@/hooks/use-subject";
import { useTag } from "@/hooks/use-tag";
import React from "react";

const SubjectAndTags = () => {
	const { sessionData } = useStudy();
	const { availableTags } = useTag();
	const { availableSubjects } = useSubject();

	const tags = availableTags.filter((tag) =>
		sessionData.tags.some((sessionTag) => sessionTag.id === tag.id)
	);

	const subjects = availableSubjects.filter((subject) =>
		sessionData.subjects.some(
			(sessionSubject) => sessionSubject.id === subject.id
		)
	);
	console.log(tags, subjects);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-2">
				<span className="text-nowrap font-medium text-gray-700">
					Môn học:
				</span>
				<span className="flex flex-row flex-wrap gap-2 text-lg font-semibold">
					{subjects?.map((subject) => (
						<Badge
							key={subject.id}
							style={{
								backgroundColor: subject.color,
								color: "white",
							}}
						>
							{subject.name}
						</Badge>
					))}
				</span>
			</div>
			<div className="flex items-center gap-2">
				<span className="font-medium text-gray-700">Tags:</span>
				{tags.length > 0 ? (
					<div className="flex flex-wrap gap-2">
						{sessionData.tags.map((tag) => (
							<Badge
								key={tag.id}
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
