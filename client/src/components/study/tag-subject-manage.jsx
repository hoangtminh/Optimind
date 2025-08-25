import React, { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, TagIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTag } from "@/hooks/use-tag";
import AddTag from "../tag/add-tag";
import EditTag from "../tag/edit-tag";
import TagTable from "../tag/tag-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import AddSubject from "../subject/add-subject";
import EditSubject from "../subject/edit-subject";
import SubjectTable from "../subject/subject-table";
import { useSubject } from "@/hooks/use-subject";

const TagManagement = () => {
	const { setIsAddTagDialogOpen } = useTag();
	const { setIsAddSubjectDialogOpen } = useSubject();

	const [search, setSearch] = useState("");
	const [activeTab, setActiveTab] = useState("tag");

	return (
		<Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200">
			<CardHeader>
				<CardTitle className="flex flex-row gap-2 items-center text-lg text-orange-700">
					<TagIcon className="w-5 h-5" />
					Quản lý Tags và Subjects
				</CardTitle>
				<div className="flex gap-2 mt-3">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 border-orange-200" />
						<Input
							placeholder="Tìm kiếm..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="pl-10 border-orange-200 shadow-md"
						/>
					</div>
					{/* Add New Tag */}
					<Button
						onClick={() => {
							activeTab === "tag"
								? setIsAddTagDialogOpen(true)
								: setIsAddSubjectDialogOpen(true);
						}}
						size="sm"
						className={
							"h-auto bg-orange-400 hover:bg-orange-500 hover:cursor-pointer"
						}
					>
						<Plus className="h-5 w-5" />
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				<Tabs defaultValue={activeTab}>
					<TabsList className={"bg-orange-400"}>
						<TabsTrigger
							className={activeTab !== "tag" && `text-white`}
							value="tag"
							onClick={() => setActiveTab("tag")}
						>
							Tags
						</TabsTrigger>
						<TabsTrigger
							className={activeTab !== "subject" && `text-white`}
							value="subject"
							onClick={() => setActiveTab("subject")}
						>
							Subjects
						</TabsTrigger>
					</TabsList>

					<TabsContent value="tag">
						<div>
							{/* Tags Table */}
							<TagTable tagSearch={search} />

							{/* Add and edit tag dialog */}
							<AddTag />
							<EditTag />
						</div>
					</TabsContent>
					<TabsContent value="subject">
						<div>
							{/* Tags Table */}
							<SubjectTable subjectSearch={search} />

							{/* Add and edit tag dialog */}
							<AddSubject />
							<EditSubject />
						</div>
					</TabsContent>
					<TabsContent value="subject"></TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	);
};

export default TagManagement;
