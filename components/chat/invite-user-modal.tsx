import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { UserPlus2Icon } from "lucide-react";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { LoadingSwap } from "../ui/loading-swap";
import { addUserToChat } from "@/supabase/actions/chat";

interface InviteUserModal {
	chatId: string;
}

const formSchema = z.object({
	userId: z.string().min(1).trim(),
});

type FormData = z.infer<typeof formSchema>;

const InviteUserModal = ({ chatId }: { chatId: string }) => {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			userId: "",
		},
	});

	const onSubmit = async (data: FormData) => {
		const res = await addUserToChat({ chatId, userId: data.userId });

		if (res.error) {
			toast.error(res.message);
		} else {
			setOpen(false);
			router.refresh();
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					className="text-black cursor-pointer"
					size="sm"
					variant={"outline"}
				>
					<UserPlus2Icon className="w-4 h-4" />
					Invite User
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Invite User to Chat</DialogTitle>
					<DialogDescription>
						Enter the user ID of the person you want to invite to
						this chat
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup>
						<Controller
							name="userId"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="user-id">
										User ID
									</FieldLabel>
									<Input
										{...field}
										id="user-id"
										aria-invalid={fieldState.invalid}
									/>
									{fieldState.invalid && (
										<FieldError
											errors={[fieldState.error]}
										/>
									)}
								</Field>
							)}
						/>

						<Field>
							<Button
								type="submit"
								disabled={form.formState.isSubmitting}
								className="grow"
							>
								<LoadingSwap
									isLoading={form.formState.isSubmitting}
								>
									Invite User
								</LoadingSwap>
							</Button>
							<Button
								variant={"outline"}
								type="button"
								onClick={() => setOpen(false)}
							>
								Cancel
							</Button>
						</Field>
					</FieldGroup>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default InviteUserModal;
