"use client";

import React from "react";
import { Project } from "@/interface/project";
import ProjectCard from "./_components/project-card";
import BasePage from "@/components/shared/base-page";
import { useLanguage } from "@/components/providers/context/language-context";

const PortfolioPage: React.FC = () => {
	const { dictionary } = useLanguage();

	return (
		<BasePage
			title={dictionary?.portfolio?.title}
			titleTags={dictionary?.portfolio?.portfolio}
			id="portfolio"
		>
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
		</BasePage>
	);
};

export default PortfolioPage;
