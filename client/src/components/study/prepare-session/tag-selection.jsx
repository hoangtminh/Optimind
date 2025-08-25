"use client";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useStudy } from "@/hooks/use-study-session";
import { useTag } from "@/hooks/use-tag";
import React from "react";

const TagSelection = () => {
	const { availableTags } = useTag();
	const { selectedTags, setSelectedTags } = useStudy();

	const isTagSelected = (id) => {
		return selectedTags.some((selectedTag) => selectedTag.id === id);
	};

	return (
		<div>
			<Label className="text-md font-medium mb-3 block">
				Tags cho phiên học
			</Label>
			<div className="flex flex-wrap gap-2">
				{availableTags.map((tag) => (
					<Badge
						key={tag.id}
						variant={isTagSelected(tag.id) ? "default" : "outline"}
						className="cursor-pointer"
						style={{
							backgroundColor: isTagSelected(tag.id)
								? tag.color
								: "white",
							borderColor: tag.color,
							color: isTagSelected(tag.id) ? "white" : tag.color,
						}}
						onClick={() => {
							setSelectedTags((prev) =>
								isTagSelected(tag.id)
									? prev.filter(
											(prevTag) => prevTag.id !== tag.id
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
