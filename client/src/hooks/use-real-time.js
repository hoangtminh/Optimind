"use client";

import { useState, useEffect, useCallback } from "react";

// Simulated WebSocket connection for real-time features
export function useRealtime(roomId = null) {
	const [isConnected, setIsConnected] = useState(false);
	const [messages, setMessages] = useState([]);
	const [participants, setParticipants] = useState([]);
	const [roomUpdates, setRoomUpdates] = useState([]);

	// Simulate connection
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsConnected(true);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	// Simulate receiving messages
	const sendMessage = useCallback(
		(message) => {
			if (!isConnected) return;

			const newMessage = {
				id: Date.now(),
				content: message.content,
				sender: message.sender || "Me",
				timestamp: new Date().toLocaleTimeString("vi-VN", {
					hour: "2-digit",
					minute: "2-digit",
				}),
				isMe: message.isMe || true,
				type: message.type || "text",
			};

			setMessages((prev) => [...prev, newMessage]);

			// Simulate receiving a response after a delay
			if (!message.isMe) {
				setTimeout(() => {
					const responses = [
						"Cảm ơn bạn đã chia sẻ!",
						"Mình cũng đang gặp vấn đề tương tự",
						"Bạn có thể giải thích thêm không?",
						"Hay quá! Mình sẽ thử làm theo",
						"Cùng nhau cố gắng nhé!",
					];

					const response = {
						id: Date.now() + 1,
						content:
							responses[
								Math.floor(Math.random() * responses.length)
							],
						sender: "Bạn học",
						timestamp: new Date().toLocaleTimeString("vi-VN", {
							hour: "2-digit",
							minute: "2-digit",
						}),
						isMe: false,
						type: "text",
					};

					setMessages((prev) => [...prev, response]);
				}, 1000 + Math.random() * 2000);
			}
		},
		[isConnected]
	);

	// Simulate participant updates
	const updateParticipant = useCallback((participantId, updates) => {
		setParticipants((prev) =>
			prev.map((p) => (p.id === participantId ? { ...p, ...updates } : p))
		);

		// Add activity notification
		const activity = {
			id: Date.now(),
			type: "participant_update",
			participantId,
			updates,
			timestamp: new Date().toISOString(),
		};

		setRoomUpdates((prev) => [...prev.slice(-9), activity]);
	}, []);

	// Simulate joining/leaving
	const joinRoom = useCallback((participant) => {
		setParticipants((prev) => [...prev, participant]);

		const joinMessage = {
			id: Date.now(),
			content: `${participant.name} đã tham gia phòng`,
			type: "system",
			timestamp: new Date().toLocaleTimeString("vi-VN", {
				hour: "2-digit",
				minute: "2-digit",
			}),
			isMe: false,
		};

		setMessages((prev) => [...prev, joinMessage]);
	}, []);

	const leaveRoom = useCallback(
		(participantId) => {
			const participant = participants.find(
				(p) => p.id === participantId
			);
			if (participant) {
				setParticipants((prev) =>
					prev.filter((p) => p.id !== participantId)
				);

				const leaveMessage = {
					id: Date.now(),
					content: `${participant.name} đã rời phòng`,
					type: "system",
					timestamp: new Date().toLocaleTimeString("vi-VN", {
						hour: "2-digit",
						minute: "2-digit",
					}),
					isMe: false,
				};

				setMessages((prev) => [...prev, leaveMessage]);
			}
		},
		[participants]
	);

	// Simulate focus time updates
	useEffect(() => {
		if (!isConnected || participants.length === 0) return;

		const interval = setInterval(() => {
			const randomParticipant =
				participants[Math.floor(Math.random() * participants.length)];
			if (randomParticipant && Math.random() > 0.7) {
				// Randomly update focus time
				const currentMinutes = Number.parseInt(
					randomParticipant.focusTime?.split("h")[1]?.split("m")[0] ||
						"0"
				);
				const newMinutes =
					currentMinutes + Math.floor(Math.random() * 5) + 1;
				const hours = Math.floor(newMinutes / 60);
				const minutes = newMinutes % 60;

				updateParticipant(randomParticipant.id, {
					focusTime: `${hours}h ${minutes}m`,
					lastActivity: new Date().toISOString(),
				});
			}
		}, 10000); // Update every 10 seconds

		return () => clearInterval(interval);
	}, [isConnected, participants, updateParticipant]);

	return {
		isConnected,
		messages,
		participants,
		roomUpdates,
		sendMessage,
		updateParticipant,
		joinRoom,
		leaveRoom,
		setParticipants,
	};
}

// Hook for online status
export function useOnlineStatus() {
	const [isOnline, setIsOnline] = useState(true);
	const [lastSeen, setLastSeen] = useState(null);

	useEffect(() => {
		const handleOnline = () => {
			setIsOnline(true);
			setLastSeen(null);
		};

		const handleOffline = () => {
			setIsOnline(false);
			setLastSeen(new Date());
		};

		window.addEventListener("online", handleOnline);
		window.addEventListener("offline", handleOffline);

		return () => {
			window.removeEventListener("online", handleOnline);
			window.removeEventListener("offline", handleOffline);
		};
	}, []);

	return { isOnline, lastSeen };
}

// Hook for typing indicators
export function useTypingIndicator() {
	const [typingUsers, setTypingUsers] = useState([]);

	const startTyping = useCallback((userId, userName) => {
		setTypingUsers((prev) => {
			const existing = prev.find((u) => u.id === userId);
			if (existing) return prev;

			return [
				...prev,
				{ id: userId, name: userName, timestamp: Date.now() },
			];
		});

		// Auto-remove after 3 seconds
		setTimeout(() => {
			setTypingUsers((prev) => prev.filter((u) => u.id !== userId));
		}, 3000);
	}, []);

	const stopTyping = useCallback((userId) => {
		setTypingUsers((prev) => prev.filter((u) => u.id !== userId));
	}, []);

	return {
		typingUsers,
		startTyping,
		stopTyping,
	};
}
