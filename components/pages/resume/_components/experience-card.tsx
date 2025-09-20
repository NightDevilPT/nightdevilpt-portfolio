"use client";

import React from "react";
import { TiStarFullOutline } from "react-icons/ti";
import SpotlightCard from "@/components/ui/SpotlightCard";

export interface ExperienceItem {
	title: string;
	company: string;
	timeline: string;
	place: string;
	description: string;
	responsibilities: string[];
	techStack: string[];
}

interface Props {
	experience: ExperienceItem;
	index: number;
	total: number;
}

const ExperienceCard: React.FC<Props> = ({ experience, index, total }) => {
	return (
		<div
			key={`experience-${experience.title}-${index}`}
			className="relative flex items-start w-full group"
		>
			{/* Timeline Marker and Line */}
			<div className="flex absolute left-1 top-1 z-10 flex-col items-center flex-shrink-0">
				<div className="p-2 bg-primary/20 backdrop-blur-2xl text-primary-foreground rounded-full transition-colors">
					<TiStarFullOutline className="w-5 h-5 text-primary" />
				</div>
				{index < total - 1 && (
					<div className="w-0.5 h-full bg-border/50 mt-2"></div>
				)}
			</div>

			{/* Experience Content */}
			<SpotlightCard className="p-6 w-full !bg-transparent hover:shadow-lg backdrop-blur-xl transition-all duration-300 border border-border/50 mb-4">
				<div className="flex flex-col">
					<h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-primary/80 transition-colors">
						{experience.title}
					</h3>
					<p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
						{experience.company}
					</p>
					<p className="text-sm text-muted-foreground mb-2">
						{experience.timeline} – {experience.place}
					</p>
					<p className="text-muted-foreground leading-relaxed text-sm mb-3">
						{experience.description}
					</p>

					{/* Responsibilities */}
					<ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
						{experience.responsibilities?.map((point, idx) => (
							<li key={`resp-${idx}`}>{point}</li>
						))}
					</ul>

					{/* Tech Stack */}
					{experience.techStack?.length > 0 && (
						<div className="mt-3">
							<p className="text-sm font-semibold text-primary">
								Tech Stack:
							</p>
							<div className="flex flex-wrap gap-2 mt-1">
								{experience.techStack.map((tech, idx) => (
									<span
										key={`tech-${idx}`}
										className="px-2 py-1 text-xs rounded-md border border-border/50 text-muted-foreground bg-muted/30"
									>
										{tech}
									</span>
								))}
							</div>
						</div>
					)}
				</div>
			</SpotlightCard>
		</div>
	);
};

export default ExperienceCard;
