import { Badge } from "@/components/ui/badge";
import { useStudy } from "@/hooks/use-study-session";
import { useTag } from "@/hooks/use-tag";
import React from "react";

const Tags = () => {
	const { sessionData } = useStudy();
	const { tags } = useTag();

	const sessionTags = tags.filter((tag) =>
		sessionData.tags.some((sessionTag) => sessionTag._id === tag._id)
	);

	return (
		<div className="flex flex-col p-3 gap-4 bg-white rounded-lg shadow-lg border-gray-400/70">
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

export default Tags;
