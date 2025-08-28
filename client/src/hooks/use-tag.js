"use client";

import { tagApi } from "@/actions/tag-action";
import { toast } from "sonner";

const {
	createContext,
	useState,
	useContext,
	useMemo,
	useEffect,
} = require("react");

const TagContext = createContext();
export function useTag() {
	return useContext(TagContext);
}

// 		{ id: 1, name: "Ôn tập", color: "#228B22" },
// 		{ id: 2, name: "Bài tập", color: "#FF7F50" },
// 		{ id: 3, name: "Đọc sách", color: "#228B22" },
// 		{ id: 4, name: "Nghiên cứu", color: "#4169E1" },
// 		{ id: 5, name: "Thực hành", color: "#FF7F50" },

export function TagProvider({ children }) {
	const [tags, setTags] = useState([]);
	const [editingTag, setEditingTag] = useState({
		_id: "",
		name: "",
		color: "",
	});
	const [tagLoading, setTagLoading] = useState(false);

	// Dialog states for tag management
	const [isAddTagDialogOpen, setIsAddTagDialogOpen] = useState(false);
	const [isEditTagDialogOpen, setIsEditTagDialogOpen] = useState(false);

	useEffect(() => {
		getTag();
	}, []);

	const getTag = async () => {
		if (tagLoading) return;
		setTagLoading(() => true);
		try {
			const res = await tagApi.getUserTag();

			if (res.success) {
				setTags(() => res.data);
			}
		} catch (error) {
			toast.error(error.message);
		} finally {
			setTagLoading(false);
		}
	};

	const createTag = async (newTagData) => {
		if (tagLoading) return;
		setTagLoading(() => true);
		try {
			if (newTagData.name.trim()) {
				const res = await tagApi.createTag({
					name: newTagData.name.trim(),
					color: newTagData.color.toLowerCase().trim(),
				});
				if (res.success) {
					getTag();
					toast.success("New tag created");
				}
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	const updateTag = async (tagId, newTagData) => {
		if (tagLoading) return;
		try {
			setTagLoading(true);
			const res = await tagApi.updateTag({
				_id: tagId,
				name: newTagData.name.trim(),
				color: newTagData.color.toLowerCase().trim(),
			});
			if (res.success) {
				getTag();
				toast.success("Update tag successfully");
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	const deleteTag = async (tagId) => {
		if (tagLoading) return;
		try {
			setTagLoading(true);
			const res = await tagApi.deleteTag({
				_id: tagId,
			});
			if (res.success) {
				getTag();
				toast.success("Delete tag successfully");
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	const contextValue = {
		tags,
		editingTag,
		setEditingTag,

		isAddTagDialogOpen,
		isEditTagDialogOpen,
		setIsAddTagDialogOpen,
		setIsEditTagDialogOpen,

		getTag,
		createTag,
		updateTag,
		deleteTag,
	};
	return (
		<TagContext.Provider value={contextValue}>
			{children}
		</TagContext.Provider>
	);
}
