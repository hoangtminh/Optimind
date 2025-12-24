// Tên file: app/tasks/contexts/ProjectContext.tsx
"use client";

import { Project } from "@/lib/type/tasks-type";
import { createProject } from "@/supabase/actions/project";
import { getAllProject } from "@/supabase/lib/getProject";
import { createProjectSchema } from "@/supabase/schemas/project-schema";
import { useRouter } from "next/navigation";
import React, {
	createContext,
	useContext,
	useState,
	FC,
	ReactNode,
	useCallback,
	useEffect,
	useMemo,
} from "react";
import { toast } from "sonner";
import z from "zod";

interface ProjectContextType {
	projects: Project[];
	selectedProjectId: string;
	setSelectedProjectId: (id: string) => void;
	handleCreateProject: ({
		name,
		description,
	}: {
		name: string;
		description: string;
	}) => void;
	isCreateProjectOpen: boolean;
	setIsCreateProjectOpen: (bool: boolean) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProject = () => {
	const context = useContext(ProjectContext);
	if (!context)
		throw new Error(
			"useProjectContext phải được dùng trong ProjectProvider"
		);
	return context;
};

export const ProjectProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [selectedProjectId, setSelectedProjectId] = useState("");
	const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
	const router = useRouter();

	const handleCreateProject = async (
		formData: z.infer<typeof createProjectSchema>
	) => {
		const { message, error } = await createProject(formData);
		if (error) {
			toast.error(message);
		} else {
			toast.success("Project created");
			getProjects();
			router.refresh();
		}
	};

	const getProjects = useCallback(async () => {
		const projects = await getAllProject();
		setProjects(projects ? projects : []);
	}, []);

	useEffect(() => {
		getProjects();
	}, []);

	const contextValue = {
		projects,
		selectedProjectId,
		setSelectedProjectId,
		handleCreateProject,
		isCreateProjectOpen,
		setIsCreateProjectOpen,
	};

	return (
		<ProjectContext.Provider value={contextValue}>
			{children}
		</ProjectContext.Provider>
	);
};
