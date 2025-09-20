"use client";

import React from "react";
import { TiStarFullOutline } from "react-icons/ti";
import SpotlightCard from "@/components/ui/SpotlightCard";

export interface EducationItem {
	title: string;
	timeline: string;
	courseBy: string;
	description: string;
	grade: string;
	place: string;
}

interface Props {
	education: EducationItem;
	index: number;
	total: number;
}

const EducationCard: React.FC<Props> = ({ education, index, total }) => {
	return (
		<div
			key={`education-${education.title}-${index}`}
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

			{/* Education Content */}
			<SpotlightCard className="p-6 w-full !bg-transparent hover:shadow-lg backdrop-blur-xl transition-all duration-300 border border-border/50 mb-4">
				<div className="flex flex-col">
					<h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-primary/80 transition-colors">
						{education.title}
					</h3>
					<p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
						{education.courseBy}
					</p>
					<p className="text-sm text-muted-foreground mb-2">
						{education.timeline} – {education.place}
					</p>
					<p className="text-muted-foreground leading-relaxed text-sm">
						{education.description}
					</p>
					<p className="text-sm font-semibold text-primary mt-2">
						{education.grade}
					</p>
				</div>
			</SpotlightCard>
		</div>
	);
};

export default EducationCard;
