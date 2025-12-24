import React from "react";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteTask } from "@/supabase/actions/task";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTask } from "@/hooks/useTask";

const DeleteTaskAlert = ({
	taskId,
	taskTitle,
}: {
	taskId: string;
	taskTitle: string;
}) => {
	const router = useRouter();
	const { setIsDetailSheetOpen } = useTask();
	const handleDeleteTask = async (taskId: string) => {
		const { error, message } = await deleteTask(taskId);
		if (error) {
			toast.error(message);
		} else {
			toast.success("Deleted task");
			setIsDetailSheetOpen(false);
			router.refresh();
		}
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="destructive">Delete</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="bg-white/90">
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you sure want to delete "{taskTitle}" task
					</AlertDialogTitle>
					<AlertDialogDescription>
						You can not restore what you deleted!
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className="hover:bg-gray-300">
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction asChild>
						<Button
							variant={"destructive"}
							className="bg-red-500 hover:bg-red-600"
							onClick={() => handleDeleteTask(taskId)}
						>
							Delete
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteTaskAlert;
