"use client";
const { createContext, useState, useContext } = require("react");

const TagContext = createContext();

export function useTag() {
	return useContext(TagContext);
}

export function TagProvider({ children }) {
	// Tag management
	const [editingTag, setEditingTag] = useState(null);

	// Dialog states for tag management
	const [isAddTagDialogOpen, setIsAddTagDialogOpen] = useState(false);
	const [isEditTagDialogOpen, setIsEditTagDialogOpen] = useState(false);

	// Sample data
	const [availableTags, setAvailableTags] = useState([
		{ id: 1, name: "Ôn tập", color: "#228B22" },
		{ id: 2, name: "Bài tập", color: "#FF7F50" },
		{ id: 3, name: "Đọc sách", color: "#228B22" },
		{ id: 4, name: "Nghiên cứu", color: "#4169E1" },
		{ id: 5, name: "Thực hành", color: "#FF7F50" },
	]);

	const [newTagData, setNewTagData] = useState({
		name: "",
		color: "#228B22",
	});

	const addTag = (newTagData) => {
		if (newTagData.name.trim()) {
			const newTag = {
				id: Date.now(),
				name: newTagData.name,
				color: newTagData.color,
			};
			setAvailableTags([...availableTags, newTag]);
		}
	};

	const updateTag = (id, name, color) => {
		setAvailableTags(
			availableTags.map((tag) =>
				tag.id === id ? { ...tag, name, color } : tag
			)
		);
		setEditingTag(null);
	};

	const deleteTag = (id) => {
		setAvailableTags(availableTags.filter((tag) => tag.id !== id));
	};

	const contextValue = {
		availableTags,
		isAddTagDialogOpen,
		isEditTagDialogOpen,
		setIsAddTagDialogOpen,
		setIsEditTagDialogOpen,
		editingTag,
		setEditingTag,
		addTag,
		updateTag,
		deleteTag,
		newTagData,
		setNewTagData,
	};
	return (
		<TagContext.Provider value={contextValue}>
			{children}
		</TagContext.Provider>
	);
}
