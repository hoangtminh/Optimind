import { cn } from "@/lib/utils";

const LeaveModal = ({
	isOpen,
	onConfirm,
	onCancel,
}: {
	isOpen: boolean;
	onConfirm: () => void;
	onCancel: () => void;
}) => {
	if (!isOpen) return null;
	const glassEffect =
		"bg-black/30 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg";

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
			<div
				className={cn(
					"p-6 max-w-sm transform transition-all",
					glassEffect
				)}
			>
				<div className="flex items-center justify-center w-12 h-12 mx-auto bg-amber-100 rounded-full">
					{/* Icon cảnh báo màu cam */}
					<span className="text-amber-600 text-xl">⚠️</span>
				</div>

				<div className="mt-4 text-center">
					<h3 className="text-lg font-bold">
						Dữ liệu chưa được lưu!
					</h3>
					<p className="text-sm text-gray-500 mt-2">
						Bạn có thay đổi chưa lưu trên hệ thống. Nếu rời đi ngay
						bây giờ, các thay đổi này sẽ bị mất.
					</p>
				</div>

				<div className="mt-6 flex flex-col gap-2">
					<button
						onClick={onConfirm}
						className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition"
					>
						Rời khỏi trang
					</button>
					<button
						onClick={onCancel}
						className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-md transition"
					>
						Tiếp tục học
					</button>
				</div>
			</div>
		</div>
	);
};

export default LeaveModal;
