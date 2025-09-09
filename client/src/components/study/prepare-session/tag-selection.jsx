"use client";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useStudy } from "@/hooks/use-study-session";
import { useTag } from "@/hooks/use-tag";
import React from "react";

const TagSelection = () => {
	const { tags } = useTag();
	const { sessionTags, setSessionTags } = useStudy();

	const isTagSelected = (id) => {
		return sessionTags.some((selectedTag) => selectedTag._id === id);
	};

	return (
		<div>
			<Label className="text-md font-medium mb-3 block">
				Tags cho phiên học
			</Label>
			<div className="flex flex-wrap gap-2">
				{tags.map((tag) => (
					<Badge
						key={tag._id}
						variant={isTagSelected(tag._id) ? "default" : "outline"}
						className="cursor-pointer"
						style={{
							backgroundColor: isTagSelected(tag._id)
								? tag.color
								: "white",
							borderColor: tag.color,
							color: isTagSelected(tag._id) ? "white" : tag.color,
						}}
						onClick={() => {
							setSessionTags((prev) =>
								isTagSelected(tag._id)
									? prev.filter(
											(prevTag) => prevTag._id !== tag._id
									  )
									: [...prev, tag]
							);
						}}
					>
						{tag.name}
					</Badge>
				))}
			</div>
		</div>
	);
};

export default TagSelection;
