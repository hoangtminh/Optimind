"use client";

import { useEffect, useRef, useState } from "react";

export const useIntersectionObserver = (options) => {
	const [isIntersecting, setIsIntersecting] = useState(false);
	const targetRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			setIsIntersecting(entry.isIntersecting);
		}, options);

		if (targetRef.current) {
			observer.observe(targetRef.current);
		}

		return () => observer.disconnect();
	}, [options]);

	return [targetRef, isIntersecting];
};

export const useParallax = () => {
	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return scrollY;
};
