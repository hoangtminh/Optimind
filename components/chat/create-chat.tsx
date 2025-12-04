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
	DialogTrigger,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { GroupIcon } from "lucide-react";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import {
	Field,
	FieldContent,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "../ui/field";
import { LoadingSwap } from "../ui/loading-swap";
import { createChatSchema } from "@/supabase/schemas/chat-schema";
import { createChat } from "@/supabase/actions/chat";
import { toast } from "sonner";

type FormData = z.infer<typeof createChatSchema>;

type CreateChatProps = {
	isCreateChatOpen: boolean;
	setIsCreateChatOpen: (open: boolean) => void;
};

const CreateChat = ({
	isCreateChatOpen,
	setIsCreateChatOpen,
}: CreateChatProps) => {
	const form = useForm<FormData>({
		defaultValues: {
			name: "",
			isPublic: false,
		},
		resolver: zodResolver(createChatSchema),
	});

	const handleSubmit = async (data: FormData) => {
		setIsCreateChatOpen(false);
		const { error, message } = await createChat(data);
		if (error) {
			toast.error(message);
		} else {
			toast.success("Chat room created");
		}
	};

	return (
		<Dialog open={isCreateChatOpen} onOpenChange={setIsCreateChatOpen}>
			<DialogContent className="bg-black/50 backdrop-blur-md border-white/20 text-white">
				<DialogHeader>
					<DialogTitle>Tạo nhóm chat mới</DialogTitle>
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
										Room Name
									</FieldLabel>
									<Input
										{...field}
										id={field.name}
										aria-invalid={fieldState.invalid}
										placeholder="Nhập tên nhóm chat"
									/>
									{fieldState.error && (
										<FieldError
											errors={[fieldState.error]}
										/>
									)}
								</Field>
							)}
						/>

						<Controller
							name="isPublic"
							control={form.control}
							render={({
								field: { value, onChange, ...field },
								fieldState,
							}) => (
								<Field
									orientation={"horizontal"}
									data-invalid={fieldState.invalid}
								>
									<Checkbox
										{...field}
										id={field.name}
										checked={value}
										aria-invalid={fieldState.invalid}
										onCheckedChange={onChange}
										className="data-[state=checked]:bg-blue-600"
									/>
									<FieldContent>
										<FieldLabel htmlFor={field.name}>
											Public Room
										</FieldLabel>
										{fieldState.error && (
											<FieldError
												errors={[fieldState.error]}
											/>
										)}
									</FieldContent>
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
								Tạo đoạn chat
							</LoadingSwap>
						</Button>
						<Button
							onClick={() => {
								setIsCreateChatOpen(false);
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

export default CreateChat;
