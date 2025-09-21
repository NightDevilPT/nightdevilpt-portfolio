"use client";

import {
	SiReact,
	SiNestjs,
	SiPrisma,
	SiMongodb,
	SiStrapi,
	SiAngular,
	SiFastapi,
	SiDocker,
} from "react-icons/si";
import {
	FaBrain,
	FaCcStripe,
	FaCss3Alt,
	FaHtml5,
	FaJsSquare,
} from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import React, { ElementType } from "react";
import LogoLoop from "@/components/ui/LogoLoop";
import BasePage from "@/components/shared/base-page";
import { BiLogoPostgresql, BiLogoTypescript } from "react-icons/bi";
import EducationCard, { EducationItem } from "./_components/education-card";
import { useLanguage } from "@/components/providers/context/language-context";
import ExperienceCard, { ExperienceItem } from "./_components/experience-card";

const ResumePage: React.FC = () => {
	const { dictionary } = useLanguage();

	const techLogos: { [key: string]: React.ReactNode } = {
		FaHtml5: <FaHtml5 className="text-primary" />,
		FaCss3Alt: <FaCss3Alt className="text-primary" />,
		FaJsSquare: <FaJsSquare className="text-primary" />,
		SiReact: <SiReact className="text-primary" />,
		RiNextjsFill: <RiNextjsFill className="text-primary" />,
		SiNestjs: <SiNestjs className="text-primary" />,
		SiPrisma: <SiPrisma className="text-primary" />,
		SiMongodb: <SiMongodb className="text-primary" />,
		BiLogoPostgresql: <BiLogoPostgresql className="text-primary" />,
		BiLogoTypescript: <BiLogoTypescript className="text-primary" />,
		SiStrapi: <SiStrapi className="text-primary" />,
		FaCcStripe: <FaCcStripe className="text-primary" />,
		SiAngular: <SiAngular className="text-primary" />, // Added
		SiFastapi: <SiFastapi className="text-primary" />, // Added (assuming icon exists)
		SiDocker: <SiDocker className="text-primary" />, // Added
		FaBrain: <FaBrain className="text-primary" />, // Added for AI Tools
	};

	return (
		<BasePage
			id="resume"
			title={
				dictionary?.resume?.title || "Education & Professional Journey"
			}
			description={
				dictionary?.resume?.description ||
				"A well-rounded academic foundation combined with diverse professional experience."
			}
			titleTags={dictionary?.resume?.resume || "Resume"}
		>
			<div className="w-full h-auto space-y-12">
				{/* Education Section */}
				<div className="w-full">
					<h2 className="text-2xl font-bold mb-3 text-primary">
						{dictionary?.resume?.myEducation || "Education"}
					</h2>
					<p className="text-xl">
						{dictionary?.resume?.educationDescription ||
							"An overview of my academic qualifications and learning journey."}
					</p>
					<div className="relative mt-5 flex flex-col gap-4">
						{dictionary?.resume?.educations?.map(
							(edu: EducationItem, idx: number) => (
								<EducationCard
									key={idx}
									education={edu}
									index={idx}
									total={
										dictionary?.resume?.educations
											?.length || 0
									}
								/>
							)
						) || (
							<p className="text-muted-foreground">
								No education details available.
							</p>
						)}
					</div>
				</div>

				{/* Experience Section */}
				<div className="w-full">
					<h2 className="text-2xl font-bold mb-3 text-primary">
						{dictionary?.resume?.myExperience || "Experience"}
					</h2>
					<p className="text-xl">
						{dictionary?.resume?.experienceDescription ||
							"A summary of my professional contributions and roles."}
					</p>
					<div className="relative mt-5 flex flex-col gap-4">
						{dictionary?.resume?.experiences?.map(
							(exp: ExperienceItem, idx: number) => (
								<ExperienceCard
									key={idx}
									experience={exp}
									index={idx}
									total={
										dictionary?.resume?.experiences
											?.length || 0
									}
								/>
							)
						) || (
							<p className="text-muted-foreground">
								No experience details available.
							</p>
						)}
					</div>
				</div>

				{/* Tools and Libraries Section */}
				<div className="w-full">
					<h2 className="text-2xl font-bold">
						{dictionary?.resume?.myFavouriteToolsAndLibs}
					</h2>
					<div
						className="mt-10"
						style={{
							position: "relative",
							overflow: "hidden",
						}}
					>
						<LogoLoop
							logos={dictionary?.resume?.toolsAndLibs?.map(
								(item: any) => ({
									node: techLogos[
										item.iconName
									] as ElementType,
									title: item.title,
									href: item.link,
								})
							)}
							speed={80}
							direction="right"
							logoHeight={80}
							gap={60}
							pauseOnHover
							scaleOnHover
							fadeOut
							ariaLabel="Technology tools and libraries"
						/>
					</div>
					<div
						className="mt-10"
						style={{
							position: "relative",
							overflow: "hidden",
						}}
					>
						<LogoLoop
							logos={dictionary?.resume?.toolsAndLibs?.map(
								(item: any) => ({
									node: techLogos[
										item.iconName
									] as ElementType,
									title: item.title,
									href: item.link,
								})
							)}
							speed={80}
							direction="left"
							logoHeight={80}
							gap={60}
							pauseOnHover
							scaleOnHover
							fadeOut
							ariaLabel="Technology tools and libraries"
						/>
					</div>
				</div>
			</div>
		</BasePage>
	);
};

export default ResumePage;
