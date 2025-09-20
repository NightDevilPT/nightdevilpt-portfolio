"use client";

import React from "react";
import { Project } from "@/interface/project";
import { TiStarFullOutline } from "react-icons/ti";
import ProjectCard from "./_components/project-card";
import { useLanguage } from "@/components/providers/context/language-context";

const PortfolioPage: React.FC = () => {
	const { dictionary } = useLanguage();

	return (
		<div
			className="w-full h-auto relative mt-44 max-xl:mt-10"
			id="portfolio"
		>
			<span className="px-5 py-2 max-w-44 mb-5 rounded-full flex justify-center gap-4 items-center border-[1px]">
				<TiStarFullOutline className="w-5 h-5 text-muted-foreground" />
				{dictionary?.portfolio?.portfolio}
			</span>

			<h1 className="mt-10 text-[clamp(1.25rem,5vw+1rem,4.5rem)] text-primary font-bold capitalize">
				{dictionary?.portfolio?.title}
			</h1>

			<div className="grid grid-cols-2 max-lg:grid-cols-1 gap-6 mt-6">
				{dictionary?.portfolio?.project.map((project: Project) => (
					<ProjectCard
						key={project.id}
						project={{
							...project,
						}}
					/>
				))}
			</div>
		</div>
	);
};

export default PortfolioPage;
