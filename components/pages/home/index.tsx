"use client";

import React from "react";
import { TiStarFullOutline } from "react-icons/ti";
import { Button } from "@/components/ui/button";
import { Download, LayoutDashboard } from "lucide-react";
import { useLanguage } from "@/components/providers/context/language-context";

interface AnimatedButtonProps {
	label: string;
	icon: React.ReactElement<{ className?: string }>;
	className?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
	label,
	icon,
	className,
}) => (
	<Button
		variant="outline"
		className={`flex hover:!bg-primary justify-start items-center gap-3 !p-6 rounded-full group transition-all duration-200 max-xl:!px-8 max-xl:!py-6 backdrop-blur-xl text-left text-[clamp(0.875rem,2vw+0.5rem,1rem)] ${className}`}
	>
		<div className="relative overflow-hidden">
			<p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] flex justify-center items-center gap-3">
				{label}
				{React.cloneElement(icon, { className: "w-5 h-5" })}
			</p>
			<p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] flex justify-center items-center gap-3">
				{label}
				{React.cloneElement(icon, { className: "w-5 h-5" })}
			</p>
		</div>
	</Button>
);

const HomePage: React.FC = () => {
	const { dictionary } = useLanguage();

	return (
		<div className="w-full h-auto relative pt-40 max-xl:pt-10" id="home">
			<span className="px-5 py-2 max-w-44 mb-5 rounded-full flex justify-center gap-4 items-center border-[1px]">
				<TiStarFullOutline className="w-5 h-5 text-muted-foreground" />
				{dictionary?.general?.letsMeet}
			</span>
			<h1 className="max-xl:mt-0 text-[clamp(2.25rem,5vw+1rem,4.5rem)] text-primary font-bold">
				{dictionary?.home?.title}
			</h1>
			<span className="text-[clamp(1.5rem,3vw+0.5rem,2.25rem)] mt-4">
				{dictionary?.home?.shortDescription}
			</span>

			<div className="w-full h-auto flex justify-start gap-5 items-start mt-8 flex-wrap">
				<AnimatedButton
					label={dictionary?.home?.myWork || "My Work"}
					icon={<LayoutDashboard />}
				/>
				<AnimatedButton
					label={dictionary?.home?.downloadCV || "Download CV"}
					icon={<Download />}
					className="!bg-primary"
				/>
			</div>
		</div>
	);
};

export default HomePage;
