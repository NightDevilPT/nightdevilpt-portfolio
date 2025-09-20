import React, {
	ElementType,
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useState,
} from "react";
import {
	motion,
	AnimatePresence,
	Transition,
	VariantLabels,
	Target,
	TargetAndTransition,
} from "motion/react";

function cn(...classes: (string | undefined | null | boolean)[]): string {
	return classes.filter(Boolean).join(" ");
}

export interface RotatingIconRef {
	next: () => void;
	previous: () => void;
	jumpTo: (index: number) => void;
	reset: () => void;
}

export interface RotatingIconProps
	extends Omit<
		React.ComponentPropsWithoutRef<typeof motion.span>,
		"children" | "transition" | "initial" | "animate" | "exit"
	> {
	icons: ElementType[];
	transition?: Transition;
	initial?: boolean | Target | VariantLabels;
	animate?: boolean | VariantLabels | TargetAndTransition;
	exit?: Target | VariantLabels;
	animatePresenceMode?: "sync" | "wait";
	animatePresenceInitial?: boolean;
	rotationInterval?: number;
	loop?: boolean;
	auto?: boolean;
	onNext?: (index: number) => void;
	mainClassName?: string;
	iconClassName?: string;
	iconWidth?: string; // e.g., "w-6" for Tailwind
	iconHeight?: string; // e.g., "h-6" for Tailwind
}

const RotatingIcon = forwardRef<RotatingIconRef, RotatingIconProps>(
	(
		{
			icons,
			transition = { type: "spring", damping: 25, stiffness: 300 },
			initial = { y: "100%", opacity: 0 },
			animate = { y: 0, opacity: 1 },
			exit = { y: "-120%", opacity: 0 },
			animatePresenceMode = "wait",
			animatePresenceInitial = false,
			rotationInterval = 2000,
			loop = true,
			auto = true,
			onNext,
			mainClassName,
			iconClassName,
			iconWidth = "w-6", // Default Tailwind width
			iconHeight = "h-6", // Default Tailwind height
			...rest
		},
		ref
	) => {
		const [currentIconIndex, setCurrentIconIndex] = useState<number>(0);

		const handleIndexChange = useCallback(
			(newIndex: number) => {
				setCurrentIconIndex(newIndex);
				if (onNext) onNext(newIndex);
			},
			[onNext]
		);

		const next = useCallback(() => {
			const nextIndex =
				currentIconIndex === icons.length - 1
					? loop
						? 0
						: currentIconIndex
					: currentIconIndex + 1;
			if (nextIndex !== currentIconIndex) {
				handleIndexChange(nextIndex);
			}
		}, [currentIconIndex, icons.length, loop, handleIndexChange]);

		const previous = useCallback(() => {
			const prevIndex =
				currentIconIndex === 0
					? loop
						? icons.length - 1
						: currentIconIndex
					: currentIconIndex - 1;
			if (prevIndex !== currentIconIndex) {
				handleIndexChange(prevIndex);
			}
		}, [currentIconIndex, icons.length, loop, handleIndexChange]);

		const jumpTo = useCallback(
			(index: number) => {
				const validIndex = Math.max(
					0,
					Math.min(index, icons.length - 1)
				);
				if (validIndex !== currentIconIndex) {
					handleIndexChange(validIndex);
				}
			},
			[icons.length, currentIconIndex, handleIndexChange]
		);

		const reset = useCallback(() => {
			if (currentIconIndex !== 0) {
				handleIndexChange(0);
			}
		}, [currentIconIndex, handleIndexChange]);

		useImperativeHandle(
			ref,
			() => ({
				next,
				previous,
				jumpTo,
				reset,
			}),
			[next, previous, jumpTo, reset]
		);

		useEffect(() => {
			if (!auto) return;
			const intervalId = setInterval(next, rotationInterval);
			return () => clearInterval(intervalId);
		}, [next, rotationInterval, auto]);

		const IconComponent = icons[currentIconIndex];

		return (
			<motion.span
				className={cn(
					"inline-flex items-center justify-center",
					mainClassName
				)}
				{...rest}
				layout
				transition={transition}
			>
				<AnimatePresence
					mode={animatePresenceMode}
					initial={animatePresenceInitial}
				>
					<motion.span
						key={currentIconIndex}
						initial={initial}
						animate={animate}
						exit={exit}
						transition={transition}
						className={cn(
							"inline-flex",
							iconClassName,
							iconWidth,
							iconHeight
						)}
					>
						<IconComponent />
					</motion.span>
				</AnimatePresence>
			</motion.span>
		);
	}
);

RotatingIcon.displayName = "RotatingIcon";
export default RotatingIcon;
