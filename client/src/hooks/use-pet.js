"use client";

import { useState } from "react";

export function usePet() {
	const [pets, setPets] = useState([
		{
			id: 1,
			name: "Nerd",
			rarity: "common",
			stage: "egg",
			experience: 3.6,
			requiredExp: 10,
			unlocked: true,
			active: true,
			studyHoursRequired: 18,
			color: "from-cyan-400 to-cyan-500",
		},
		{
			id: 2,
			name: "Thông Minh",
			rarity: "uncommon",
			stage: "egg",
			experience: 0,
			requiredExp: 20,
			unlocked: false,
			active: false,
			studyHoursRequired: 10,
			color: "from-green-400 to-green-500",
		},
		{
			id: 3,
			name: "Siêu Trí Tuệ",
			rarity: "rare",
			stage: "egg",
			experience: 0,
			requiredExp: 30,
			unlocked: false,
			active: false,
			studyHoursRequired: 25,
			color: "from-blue-400 to-blue-500",
		},
		{
			id: 4,
			name: "Thiên Tài",
			rarity: "epic",
			stage: "egg",
			experience: 0,
			requiredExp: 50,
			unlocked: false,
			active: false,
			studyHoursRequired: 50,
			color: "from-purple-400 to-purple-500",
		},
		{
			id: 5,
			name: "Huyền Thoại",
			rarity: "legendary",
			stage: "egg",
			experience: 0,
			requiredExp: 75,
			unlocked: false,
			active: false,
			studyHoursRequired: 100,
			color: "from-yellow-400 to-orange-500",
		},
		{
			id: 6,
			name: "Thần Thoại",
			rarity: "mythic",
			stage: "egg",
			experience: 0,
			requiredExp: 100,
			unlocked: false,
			active: false,
			studyHoursRequired: 200,
			color: "from-pink-400 to-rose-500",
		},
		{
			id: 7,
			name: "Vũ Trụ",
			rarity: "cosmic",
			stage: "egg",
			experience: 0,
			requiredExp: 150,
			unlocked: false,
			active: false,
			studyHoursRequired: 500,
			color: "from-indigo-400 via-purple-500 to-pink-500",
		},
	]);

	const [totalStudyHours, setTotalStudyHours] = useState(3.6);

	const addStudyTime = (hours) => {
		const newTotal = totalStudyHours + hours;
		setTotalStudyHours(newTotal);

		setPets((prevPets) =>
			prevPets.map((pet) => {
				if (newTotal >= pet.studyHoursRequired && !pet.unlocked) {
					return { ...pet, unlocked: true };
				}
				if (pet.active) {
					const newExp = pet.experience + hours;
					const stages = ["egg", "baby", "teen", "adult", "master"];
					let currentStage = pet.stage;
					let remainingExp = newExp;
					let currentRequiredExp = pet.requiredExp;

					while (
						remainingExp >= currentRequiredExp &&
						stages.indexOf(currentStage) < stages.length - 1
					) {
						remainingExp -= currentRequiredExp;
						currentStage = stages[stages.indexOf(currentStage) + 1];
						currentRequiredExp = Math.floor(
							currentRequiredExp * 1.5
						);
					}

					return {
						...pet,
						experience: remainingExp,
						stage: currentStage,
						requiredExp: currentRequiredExp,
					};
				}
				return pet;
			})
		);
	};

	const setActivePet = (petId) => {
		setPets((prevPets) =>
			prevPets.map((pet) => ({
				...pet,
				active: pet.id === petId && pet.unlocked,
			}))
		);
	};

	const getActivePet = () => {
		return pets.find((pet) => pet.active);
	};

	return {
		pets,
		totalStudyHours,
		addStudyTime,
		setActivePet,
		getActivePet,
	};
}
