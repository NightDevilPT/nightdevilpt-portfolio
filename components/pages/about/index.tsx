"use client";

import React from "react";
import { TiStarFullOutline } from "react-icons/ti";
import { useLanguage } from "@/components/providers/context/language-context";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { Download, Code, Server, Cpu, Palette } from "lucide-react";
import { AnimatedButton } from "../home";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface PersonalDetail {
	title: string;
	value: string;
}

interface AboutItem {
	title: string;
	value: number;
}

interface ServiceItem {
	title: string;
	description: string;
	tags?: string[];
	image?: string; // Added for image support
}

// Service icons mapping for fallback
const SERVICE_ICONS = {
	"Frontend Development": Code,
	"Backend Development": Server,
	"Full Stack Solutions": Cpu,
	"UI/UX Implementation": Palette,
} as const;

const AboutPage: React.FC = () => {
	const { dictionary } = useLanguage();

	const renderStatisticCard = (item: AboutItem, index: number) => (
		<SpotlightCard
			key={`stat-${item.title}-${index}`}
			className="bg-transparent flex justify-center items-center flex-col p-6 min-h-[160px] group"
		>
			<h2 className="text-6xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
				{item.value}+
			</h2>
			<p className="text-xl text-muted-foreground text-center font-medium">
				{item.title}
			</p>
		</SpotlightCard>
	);

	const renderPersonalDetailItem = (
		detail: PersonalDetail,
		index: number
	) => (
		<div
			key={`detail-${detail.title}-${index}`}
			className="flex justify-start items-start flex-col gap-1 p-4 rounded-lg hover:bg-muted/20 transition-colors duration-200"
		>
			<span className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
				{detail.title}
			</span>
			<span className="text-xl font-semibold text-primary">
				{detail.value}
			</span>
		</div>
	);

	const renderDescriptionParagraph = (text: string, index: number) => (
		<p
			key={`description-${index}`}
			className="text-xl text-muted-foreground leading-relaxed"
		>
			{text}
		</p>
	);

	const renderServiceCard = (service: ServiceItem, index: number) => {
		const IconComponent =
			SERVICE_ICONS[service.title as keyof typeof SERVICE_ICONS] || Code;

		return (
			<SpotlightCard
				key={`service-${service.title}-${index}`}
				className="p-6 h-full !bg-transparent hover:shadow-lg backdrop-blur-xl transition-all duration-300 border border-border/50 group"
			>
				<div className="flex flex-col h-full">
					{/* Service Header with Icon/Image */}
					<div className="flex items-start gap-4 mb-4">
						{service.image ? (
							<div className="relative w-12 h-12 rounded-lg overflow-hidden bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
								<Image
									src={service.image}
									alt={`${service.title} icon`}
									fill
									className="object-cover"
									sizes="48px"
								/>
							</div>
						) : (
							<div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors flex-shrink-0">
								<IconComponent className="w-6 h-6 text-primary" />
							</div>
						)}

						<div className="flex-1">
							<h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-primary/80 transition-colors">
								{service.title}
							</h3>
							<p className="text-muted-foreground leading-relaxed text-sm">
								{service.description}
							</p>
						</div>
					</div>

					{/* Technology Tags */}
					{service.tags && service.tags.length > 0 && (
						<div className="flex flex-wrap gap-2 mt-auto pt-4">
							{service.tags.map((tag, tagIndex) => (
								<Badge
									key={`${service.title}-tag-${tagIndex}`}
									variant="secondary"
									className="text-xs bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200"
								>
									{tag}
								</Badge>
							))}
						</div>
					)}
				</div>
			</SpotlightCard>
		);
	};

	return (
		<div
			className="w-full h-auto relative mt-20 max-xl:mt-10 space-y-8"
			id="about"
		>
			{/* Section Header */}
			<div className="flex flex-col gap-4">
				<span className="px-5 py-2 max-w-44 rounded-full flex justify-center gap-4 items-center border border-border/50 bg-muted/20 backdrop-blur-sm">
					<TiStarFullOutline className="w-5 h-5 text-muted-foreground" />
					<span className="text-sm font-medium">
						{dictionary?.about?.about}
					</span>
				</span>

				<h1 className="text-[clamp(1.25rem,5vw+1rem,4.5rem)] text-primary font-bold capitalize leading-tight">
					{dictionary?.about?.title}
				</h1>
			</div>

			{/* Statistics Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
				{dictionary?.about?.items?.map(renderStatisticCard)}
			</div>

			{/* Main Content Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
				{/* Description and CTA Section */}
				<div className="lg:col-span-2 w-full h-full">
					<div className="space-y-6">
						{/* Description Paragraphs */}
						<div className="space-y-4">
							{dictionary?.about?.descriptions?.map(
								renderDescriptionParagraph
							)}
						</div>

						{/* Call to Action */}
						<div className="flex justify-start items-center mt-8">
							<AnimatedButton
								label={
									dictionary?.home?.downloadCV ||
									"Download CV"
								}
								icon={<Download className="w-4 h-4" />}
								className="!bg-primary hover:!bg-primary/90 transition-colors duration-200"
							/>
						</div>
					</div>
				</div>

				{/* Personal Details Sidebar */}
				<div className="grid grid-cols-1 gap-2 place-content-start">
					{dictionary?.about?.personalDetails?.map(
						renderPersonalDetailItem
					)}
				</div>
			</div>

			{/* Services Section */}
			<div className="w-full mt-16">
				<h2 className="text-2xl font-bold text-primary mb-8">
					Professional Services
				</h2>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{dictionary?.about?.services?.map(renderServiceCard)}
				</div>
			</div>
		</div>
	);
};

export default AboutPage;
