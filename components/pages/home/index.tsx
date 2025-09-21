"use client";

import React from "react";
import { handleDownload } from "@/lib/utils";
import { Download, LayoutDashboard } from "lucide-react";
import BasePage, { AnimatedButton } from "@/components/shared/base-page";
import { useLanguage } from "@/components/providers/context/language-context";

const HomePage: React.FC = () => {
	const { dictionary } = useLanguage();

	return (
		<BasePage
			id="home"
			title={dictionary?.home?.title}
			description={dictionary?.home?.shortDescription}
			titleTags={dictionary?.general?.letsMeet}
		>
			<div className="w-full h-auto flex justify-start gap-5 items-start mt-8 flex-wrap">
				<AnimatedButton
					label={dictionary?.home?.myWork || "My Work"}
					icon={<LayoutDashboard />}
					className="!text-foreground hover:!text-primary-foreground"
				/>
				<AnimatedButton
					label={dictionary?.home?.downloadCV || "Download CV"}
					icon={<Download />}
					onClick={handleDownload}
					className="!bg-primary"
				/>
			</div>
		</BasePage>
	);
};

export default HomePage;
