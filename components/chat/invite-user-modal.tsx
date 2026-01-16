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
import { cn } from "@/lib/utils";

interface InviteUserModal {
	chatId: string;
}

const formSchema = z.object({
	userEmail: z.string().min(1).trim(),
});

type FormData = z.infer<typeof formSchema>;

const InviteUserModal = ({ chatId }: { chatId: string }) => {
	const glassEffect =
		"bg-black/30 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg";

	const [open, setOpen] = useState(false);
	const router = useRouter();

	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			userEmail: "",
		},
	});

	const onSubmit = async (data: FormData) => {
		const res = await addUserToChat({ chatId, userEmail: data.userEmail });

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
			<DialogContent className={cn("w-100 text-white", glassEffect)}>
				<DialogHeader>
					<DialogTitle>Invite User to Chat</DialogTitle>
					<DialogDescription>
						Enter the user email of the person you want to invite to
						this chat
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup>
						<Controller
							name="userEmail"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="user-email">
										User Email
									</FieldLabel>
									<Input
										{...field}
										id="user-email"
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
								className="bg-blue-600 hover:bg-blue-700"
							>
								<LoadingSwap
									isLoading={form.formState.isSubmitting}
								>
									Add User
								</LoadingSwap>
							</Button>
							<Button
								variant={"outline"}
								type="button"
								onClick={() => setOpen(false)}
								className="text-black"
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
