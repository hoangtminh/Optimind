"use client";

import React from "react";
import z from "zod";
import { Controller, Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
	Field,
	FieldContent,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "../ui/field";
import { LoadingSwap } from "../ui/loading-swap";
import { toast } from "sonner";
import { createProjectSchema } from "@/supabase/schemas/project-schema";
import { createProject } from "@/supabase/actions/project";
import { useProject } from "@/hooks/useProject";

type FormData = z.infer<typeof createProjectSchema>;

const CreateProject = () => {
	const { isCreateProjectOpen, setIsCreateProjectOpen, handleCreateProject } =
		useProject();
	const form = useForm<FormData>({
		defaultValues: {
			name: "",
			description: "",
		},
		resolver: zodResolver(createProjectSchema),
	});

	const handleSubmit = async (data: FormData) => {
		handleCreateProject(data);
		setIsCreateProjectOpen(false);
	};

	return (
		<Dialog
			open={isCreateProjectOpen}
			onOpenChange={setIsCreateProjectOpen}
		>
			<DialogContent className="w-100 bg-black/80 backdrop-blur-md border-white/20 text-white">
				<DialogHeader>
					<DialogTitle>Tạo project mới</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className="space-y-3"
				>
					<FieldGroup className="gap-4 my-2">
						<Controller
							name="name"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor={field.name}>
										Project Name
									</FieldLabel>
									<Input
										{...field}
										id={field.name}
										aria-invalid={fieldState.invalid}
										placeholder="Nhập tên project"
									/>
									{fieldState.error && (
										<FieldError
											errors={[fieldState.error]}
										/>
									)}
								</Field>
							)}
						/>
					</FieldGroup>

					<FieldGroup className="gap-4 my-2">
						<Controller
							name="description"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor={field.name}>
										Description
									</FieldLabel>
									<Input
										{...field}
										id={field.name}
										aria-invalid={fieldState.invalid}
										placeholder="Nhập mô tả project"
									/>
									{fieldState.error && (
										<FieldError
											errors={[fieldState.error]}
										/>
									)}
								</Field>
							)}
						/>
					</FieldGroup>

					<Field orientation={"horizontal"} className="w-full pt-4">
						<Button
							type="submit"
							className="grow bg-blue-600 hover:bg-blue-700"
							disabled={form.formState.isSubmitting}
						>
							<LoadingSwap
								isLoading={form.formState.isSubmitting}
							>
								Tạo project
							</LoadingSwap>
						</Button>
						<Button
							onClick={() => {
								setIsCreateProjectOpen(false);
								form.reset();
							}}
							type="button"
							className="text-black"
							variant="outline"
						>
							Hủy
						</Button>
					</Field>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateProject;
