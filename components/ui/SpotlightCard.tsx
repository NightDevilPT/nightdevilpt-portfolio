import React, { useRef, useState } from "react";
import { IThemeMode, useTheme } from "../providers/context/theme-context";
import { ColorSchemas } from "@/interface/color-schema";

interface Position {
	x: number;
	y: number;
}

interface SpotlightCardProps extends React.PropsWithChildren {
	className?: string;
	spotlightColor?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
	children,
	className = "",
	spotlightColor = "rgba(255, 255, 255, 0.25)",
}) => {
	const divRef = useRef<HTMLDivElement>(null);
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
	const [opacity, setOpacity] = useState<number>(0);
	const { themeMode, colorScheme } = useTheme();

	const mode: "light" | "dark" =
		themeMode === IThemeMode.DARK ? "dark" : "light";
	const color = ColorSchemas[colorScheme.toLocaleLowerCase()][mode].primary;
	ColorSchemas[colorScheme.toLocaleLowerCase()][mode].primary;

	const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
		if (!divRef.current || isFocused) return;

		const rect = divRef.current.getBoundingClientRect();
		setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
	};

	const handleFocus = () => {
		setIsFocused(true);
		setOpacity(0.6);
	};

	const handleBlur = () => {
		setIsFocused(false);
		setOpacity(0);
	};

	const handleMouseEnter = () => {
		setOpacity(0.6);
	};

	const handleMouseLeave = () => {
		setOpacity(0);
	};

	return (
		<div
			ref={divRef}
			onMouseMove={handleMouseMove}
			onFocus={handleFocus}
			onBlur={handleBlur}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className={`relative rounded-3xl border border-neutral-800 bg-gray-900 overflow-hidden p-8 ${className}`}
		>
			<div
				className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
				style={{
					opacity,
					background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${color}30, transparent 80%)`,
				}}
			/>
			{children}
		</div>
	);
};

export default SpotlightCard;
