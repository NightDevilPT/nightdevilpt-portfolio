import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import React, { useState } from "react";
import { Project } from "@/interface/project";
import Autoplay from "embla-carousel-autoplay";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ProjectDetailDialog from "./project-details-view";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { getCategoryColor, getStatusColor } from "@/lib/utils";
import { ExternalLink, Github, User, ImageIcon } from "lucide-react";
import { IThemeMode, useTheme } from "@/components/providers/context/theme-context";

interface ProjectCardProps {
	project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const {themeMode} = useTheme();

	// Initialize autoplay plugin for carousel
	const autoplayPlugin = React.useRef(
		Autoplay({ delay: 3000, stopOnInteraction: true })
	);

	// Extract project images with fallback
	const displayImages = project.images || [];
	const hasImages = displayImages.length > 0;
	const hasMultipleImages = displayImages.length > 1;

	const openExternalLink = (url: string) => {
		window.open(url, "_blank", "noopener,noreferrer");
	};

	const renderImageCarousel = () => {
		if (!hasImages) {
			return (
				<div className="w-full aspect-video bg-muted/50 flex items-center justify-center rounded-md border">
					<div className="flex flex-col items-center gap-2 text-muted-foreground">
						<ImageIcon className="h-10 w-10" />
						<span className="text-sm">No preview available</span>
					</div>
				</div>
			);
		}

		return (
			<Carousel
				opts={{
					align: "start",
					loop: hasMultipleImages,
				}}
				plugins={[autoplayPlugin.current]}
				className="w-full rounded-md overflow-hidden border"
			>
				<CarouselContent className="-ml-0">
					{displayImages.map((imageUrl, imageIndex) => (
						<CarouselItem
							key={`image-${imageIndex}`}
							className="pl-0"
						>
							<div className="relative aspect-video w-full bg-muted/30">
								<Image
									src={imageUrl}
									alt={`${project.title} preview ${
										imageIndex + 1
									}`}
									fill
									className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
									loading="lazy"
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									onError={() =>
										console.warn(
											`Failed to load image: ${imageUrl}`
										)
									}
								/>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>

				{hasMultipleImages && (
					<>
						<CarouselPrevious className="left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
						<CarouselNext className="right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
					</>
				)}
			</Carousel>
		);
	};

	const renderTechnologyBadges = () => {
		const visibleTech = project.tech.slice(0, 4);
		const remainingCount = project.tech.length - 4;

		return (
			<div className="flex flex-wrap gap-1.5">
				{visibleTech.map((technology, techIndex) => (
					<Badge
						key={`tech-${techIndex}`}
						variant="secondary"
						className="text-xs font-medium"
					>
						{technology}
					</Badge>
				))}
				{remainingCount > 0 && (
					<Badge variant="outline" className="text-xs">
						+{remainingCount} more
					</Badge>
				)}
			</div>
		);
	};

	const renderProjectMetadata = () => {
		if (!project.role) return null;

		return (
			<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
				<User className="h-3 w-3" />
				<span>{project.role}</span>
			</div>
		);
	};

	const renderActionButtons = () => (
		<div className="flex gap-2 w-full">
			{project.github && (
				<Button
					variant="outline"
					size="sm"
					className="flex-1 gap-1.5"
					onClick={() => openExternalLink(project.github)}
				>
					<Github className="h-4 w-4" />
					Source Code
				</Button>
			)}
			{project.live && (
				<Button
					variant="outline"
					size="sm"
					className="flex-1 gap-1.5"
					onClick={() => openExternalLink(project.live)}
				>
					<ExternalLink className="h-4 w-4" />
					Live Demo
				</Button>
			)}
		</div>
	);

	return (
		<SpotlightCard className={`w-auto h-auto !bg-transparent backdrop-blur-2xl !p-0 !m-0 ${themeMode===IThemeMode.LIGHT ? "!border-gray-200": ""}`}>
			<Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 group bg-card/50 border-none backdrop-blur-sm p-0 pb-6 pt-1">
				{/* Project Image Gallery */}
				<div className="relative w-full p-4 pb-0">
					{renderImageCarousel()}
				</div>

				{/* Project Information */}
				<CardHeader className="pb-3">
					<CardTitle className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
						{project.title}
					</CardTitle>
					<CardDescription className="line-clamp-3 text-sm leading-relaxed">
						{project.description}
					</CardDescription>
				</CardHeader>

				<CardContent className="space-y-4 flex-1">
					{/* Project Status and Category */}
					<div className="flex justify-end items-center gap-2 flex-wrap">
						<Badge className={getStatusColor(project.status)}>
							{project.status}
						</Badge>
						<Badge className={getCategoryColor(project.category)}>
							{project.category}
						</Badge>
					</div>

					{/* Technology Stack */}
					<div className="space-y-3">
						{renderTechnologyBadges()}
						{renderProjectMetadata()}
					</div>
				</CardContent>

				{/* Action Buttons */}
				<CardFooter className="flex flex-col gap-3 pt-4">
					{renderActionButtons()}
					<ProjectDetailDialog
						project={project}
						projectImages={displayImages}
						isOpen={isDialogOpen}
						onOpenChange={setIsDialogOpen}
					/>
				</CardFooter>
			</Card>

			{/* Project Detail Modal */}
		</SpotlightCard>
	);
};

export default ProjectCard;
