"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
	Bluetooth,
	BluetoothConnected,
	Wifi,
	Battery,
	Signal,
	Power,
	RefreshCw as Refresh,
	Settings,
	AlertCircle,
	CheckCircle,
	Clock,
} from "lucide-react";

export default function DevicePage() {
	const [isScanning, setIsScanning] = useState(false);
	const [connectedDevices, setConnectedDevices] = useState([
		{
			id: "device-1",
			name: "OptiMind Focus Band",
			type: "EEG Headband",
			batteryLevel: 85,
			signalStrength: 92,
			status: "connected",
			lastSync: "2 phút trước",
			features: [
				"Theo dõi tập trung",
				"Phát hiện mệt mỏi",
				"Nhắc nhở nghỉ ngơi",
			],
		},
	]);
	const [availableDevices, setAvailableDevices] = useState([
		{
			id: "device-2",
			name: "Smart Study Lamp",
			type: "IoT Device",
			status: "available",
		},
		{
			id: "device-3",
			name: "Focus Timer Pro",
			type: "Bluetooth Timer",
			status: "available",
		},
	]);

	const handleScanDevices = async () => {
		setIsScanning(true);

		try {
			// Check if Web Bluetooth API is supported
			if (!navigator.bluetooth) {
				alert("Trình duyệt không hỗ trợ Bluetooth Web API");
				return;
			}

			// Request Bluetooth device
			const device = await navigator.bluetooth.requestDevice({
				acceptAllDevices: true,
				optionalServices: ["battery_service", "device_information"],
			});

			console.log("[v0] Bluetooth device selected:", device.name);

			// Connect to the device
			const server = await device.gatt.connect();
			console.log("[v0] Connected to GATT server");

			// Add to connected devices (mock implementation)
			const newDevice = {
				id: `device-${Date.now()}`,
				name: device.name || "Unknown Device",
				type: "Bluetooth Device",
				batteryLevel: Math.floor(Math.random() * 100),
				signalStrength: Math.floor(Math.random() * 100),
				status: "connected",
				lastSync: "Vừa xong",
				features: ["Kết nối Bluetooth"],
			};

			setConnectedDevices((prev) => [...prev, newDevice]);
			setAvailableDevices((prev) =>
				prev.filter((d) => d.name !== device.name)
			);
		} catch (error) {
			console.error("[v0] Bluetooth connection error:", error);
			if (error.name === "NotFoundError") {
				alert("Không tìm thấy thiết bị nào");
			} else if (error.name === "SecurityError") {
				alert("Lỗi bảo mật khi kết nối Bluetooth");
			} else {
				alert("Lỗi kết nối: " + error.message);
			}
		} finally {
			setIsScanning(false);
		}
	};

	const handleDisconnectDevice = (deviceId) => {
		const device = connectedDevices.find((d) => d.id === deviceId);
		if (device) {
			setConnectedDevices((prev) =>
				prev.filter((d) => d.id !== deviceId)
			);
			setAvailableDevices((prev) => [
				...prev,
				{
					id: deviceId,
					name: device.name,
					type: device.type,
					status: "available",
				},
			]);
		}
	};

	const handleConnectDevice = (deviceId) => {
		const device = availableDevices.find((d) => d.id === deviceId);
		if (device) {
			const newConnectedDevice = {
				...device,
				batteryLevel: Math.floor(Math.random() * 100),
				signalStrength: Math.floor(Math.random() * 100),
				status: "connected",
				lastSync: "Vừa xong",
				features: ["Kết nối thành công"],
			};

			setConnectedDevices((prev) => [...prev, newConnectedDevice]);
			setAvailableDevices((prev) =>
				prev.filter((d) => d.id !== deviceId)
			);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
			<div className="max-w-7xl mx-auto space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
							Quản lý Thiết bị
						</h1>
						<p className="text-slate-600 mt-1">
							Kết nối và quản lý các thiết bị hỗ trợ học tập
						</p>
					</div>
					<Button
						onClick={handleScanDevices}
						disabled={isScanning}
						className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700"
					>
						{isScanning ? (
							<>
								<Refresh className="h-4 w-4 mr-2 animate-spin" />
								Đang quét...
							</>
						) : (
							<>
								<Bluetooth className="h-4 w-4 mr-2" />
								Quét thiết bị
							</>
						)}
					</Button>
				</div>

				{/* Connected Devices */}
				<Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-green-800">
							<BluetoothConnected className="h-5 w-5" />
							Thiết bị đã kết nối ({connectedDevices.length})
						</CardTitle>
						<CardDescription className="text-green-600">
							Các thiết bị đang hoạt động và sẵn sàng sử dụng
						</CardDescription>
					</CardHeader>
					<CardContent>
						{connectedDevices.length === 0 ? (
							<div className="text-center py-8 text-green-600">
								<Bluetooth className="h-12 w-12 mx-auto mb-4 opacity-50" />
								<p>Chưa có thiết bị nào được kết nối</p>
							</div>
						) : (
							<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
								{connectedDevices.map((device) => (
									<Card
										key={device.id}
										className="bg-white/80 border-green-200"
									>
										<CardHeader className="pb-3">
											<div className="flex items-center justify-between">
												<CardTitle className="text-lg text-green-800">
													{device.name}
												</CardTitle>
												<Badge
													variant="outline"
													className="bg-green-100 text-green-700 border-green-300"
												>
													<CheckCircle className="h-3 w-3 mr-1" />
													Kết nối
												</Badge>
											</div>
											<CardDescription className="text-green-600">
												{device.type}
											</CardDescription>
										</CardHeader>
										<CardContent className="space-y-4">
											{/* Battery Level */}
											<div className="space-y-2">
												<div className="flex items-center justify-between text-sm">
													<span className="flex items-center gap-1 text-green-700">
														<Battery className="h-4 w-4" />
														Pin
													</span>
													<span className="font-medium text-green-800">
														{device.batteryLevel}%
													</span>
												</div>
												<Progress
													value={device.batteryLevel}
													className="h-2"
												/>
											</div>

											{/* Signal Strength */}
											<div className="space-y-2">
												<div className="flex items-center justify-between text-sm">
													<span className="flex items-center gap-1 text-green-700">
														<Signal className="h-4 w-4" />
														Tín hiệu
													</span>
													<span className="font-medium text-green-800">
														{device.signalStrength}%
													</span>
												</div>
												<Progress
													value={
														device.signalStrength
													}
													className="h-2"
												/>
											</div>

											{/* Last Sync */}
											<div className="flex items-center justify-between text-sm text-green-600">
												<span className="flex items-center gap-1">
													<Clock className="h-4 w-4" />
													Đồng bộ cuối
												</span>
												<span>{device.lastSync}</span>
											</div>

											<Separator />

											{/* Features */}
											<div className="space-y-2">
												<p className="text-sm font-medium text-green-700">
													Tính năng:
												</p>
												<div className="flex flex-wrap gap-1">
													{device.features.map(
														(feature, index) => (
															<Badge
																key={index}
																variant="secondary"
																className="text-xs bg-green-100 text-green-700"
															>
																{feature}
															</Badge>
														)
													)}
												</div>
											</div>

											{/* Actions */}
											<div className="flex gap-2 pt-2">
												<Button
													variant="outline"
													size="sm"
													className="flex-1 border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
												>
													<Settings className="h-4 w-4 mr-1" />
													Cài đặt
												</Button>
												<Button
													variant="outline"
													size="sm"
													onClick={() =>
														handleDisconnectDevice(
															device.id
														)
													}
													className="border-red-300 text-red-600 hover:bg-red-50"
												>
													<Power className="h-4 w-4 mr-1" />
													Ngắt kết nối
												</Button>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						)}
					</CardContent>
				</Card>

				{/* Available Devices */}
				<Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-blue-800">
							<Wifi className="h-5 w-5" />
							Thiết bị khả dụng ({availableDevices.length})
						</CardTitle>
						<CardDescription className="text-blue-600">
							Các thiết bị có thể kết nối trong khu vực
						</CardDescription>
					</CardHeader>
					<CardContent>
						{availableDevices.length === 0 ? (
							<div className="text-center py-8 text-blue-600">
								<Wifi className="h-12 w-12 mx-auto mb-4 opacity-50" />
								<p>Không tìm thấy thiết bị khả dụng</p>
								<p className="text-sm mt-2">
									Nhấn "Quét thiết bị" để tìm kiếm
								</p>
							</div>
						) : (
							<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
								{availableDevices.map((device) => (
									<Card
										key={device.id}
										className="bg-white/80 border-blue-200"
									>
										<CardHeader className="pb-3">
											<div className="flex items-center justify-between">
												<CardTitle className="text-lg text-blue-800">
													{device.name}
												</CardTitle>
												<Badge
													variant="outline"
													className="bg-blue-100 text-blue-700 border-blue-300"
												>
													<AlertCircle className="h-3 w-3 mr-1" />
													Khả dụng
												</Badge>
											</div>
											<CardDescription className="text-blue-600">
												{device.type}
											</CardDescription>
										</CardHeader>
										<CardContent>
											<Button
												onClick={() =>
													handleConnectDevice(
														device.id
													)
												}
												className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
											>
												<Bluetooth className="h-4 w-4 mr-2" />
												Kết nối
											</Button>
										</CardContent>
									</Card>
								))}
							</div>
						)}
					</CardContent>
				</Card>

				{/* Device Status Overview */}
				<div className="grid gap-6 md:grid-cols-3">
					<Card className="bg-gradient-to-br from-cyan-50 to-blue-100 border-cyan-200">
						<CardHeader className="pb-3">
							<CardTitle className="text-cyan-800">
								Tổng quan kết nối
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<span className="text-cyan-700">
										Đã kết nối
									</span>
									<span className="font-bold text-2xl text-cyan-800">
										{connectedDevices.length}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-cyan-700">
										Khả dụng
									</span>
									<span className="font-bold text-2xl text-cyan-800">
										{availableDevices.length}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-cyan-700">
										Tổng cộng
									</span>
									<span className="font-bold text-2xl text-cyan-800">
										{connectedDevices.length +
											availableDevices.length}
									</span>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="bg-gradient-to-br from-purple-50 to-indigo-100 border-purple-200">
						<CardHeader className="pb-3">
							<CardTitle className="text-purple-800">
								Trạng thái pin
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-3">
								{connectedDevices.length === 0 ? (
									<p className="text-purple-600 text-center py-4">
										Chưa có thiết bị
									</p>
								) : (
									connectedDevices.map((device) => (
										<div
											key={device.id}
											className="space-y-1"
										>
											<div className="flex items-center justify-between text-sm">
												<span className="text-purple-700 truncate">
													{device.name}
												</span>
												<span className="font-medium text-purple-800">
													{device.batteryLevel}%
												</span>
											</div>
											<Progress
												value={device.batteryLevel}
												className="h-1.5"
											/>
										</div>
									))
								)}
							</div>
						</CardContent>
					</Card>

					<Card className="bg-gradient-to-br from-orange-50 to-red-100 border-orange-200">
						<CardHeader className="pb-3">
							<CardTitle className="text-orange-800">
								Chất lượng tín hiệu
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-3">
								{connectedDevices.length === 0 ? (
									<p className="text-orange-600 text-center py-4">
										Chưa có thiết bị
									</p>
								) : (
									connectedDevices.map((device) => (
										<div
											key={device.id}
											className="space-y-1"
										>
											<div className="flex items-center justify-between text-sm">
												<span className="text-orange-700 truncate">
													{device.name}
												</span>
												<span className="font-medium text-orange-800">
													{device.signalStrength}%
												</span>
											</div>
											<Progress
												value={device.signalStrength}
												className="h-1.5"
											/>
										</div>
									))
								)}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
