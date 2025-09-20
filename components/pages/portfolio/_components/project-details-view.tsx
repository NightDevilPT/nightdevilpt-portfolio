import React from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Project } from "@/interface/project";
import Autoplay from "embla-carousel-autoplay";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCategoryColor, getStatusColor } from "@/lib/utils";
import { Eye, User, ExternalLink, Github, ImageIcon } from "lucide-react";

interface ProjectDetailDialogProps {
	project: Project;
	projectImages: string[];
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

const ProjectDetailDialog: React.FC<ProjectDetailDialogProps> = ({
	project,
	projectImages,
	isOpen,
	onOpenChange,
}) => {
	// Initialize autoplay plugin for carousel
	const carouselAutoplay = React.useRef(
		Autoplay({ delay: 4000, stopOnInteraction: true })
	);

	// Extract image data with fallbacks
	const displayImages = projectImages || [];
	const hasImages = displayImages.length > 0;
	const hasMultipleImages = displayImages.length > 1;

	// External link handler with security
	const openExternalLink = (url: string) => {
		window.open(url, "_blank", "noopener,noreferrer");
	};

	const renderImageGallery = () => {
		if (!hasImages) {
			return (
				<div className="relative h-80 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
					<div className="flex flex-col items-center gap-3 text-muted-foreground">
						<ImageIcon className="h-16 w-16" />
						<span className="text-lg font-medium">
							No preview images available
						</span>
						<span className="text-sm">
							This project doesn{`'`}t have visual assets to
							display
						</span>
					</div>
				</div>
			);
		}

		return (
			<div className="relative">
				<Carousel
					opts={{
						align: "start",
						loop: hasMultipleImages,
					}}
					plugins={[carouselAutoplay.current]}
					className="w-full rounded-lg overflow-hidden border shadow-sm"
					onMouseEnter={carouselAutoplay.current.stop}
					onMouseLeave={carouselAutoplay.current.reset}
				>
					<CarouselContent className="-ml-0">
						{displayImages.map((imageUrl, imageIndex) => (
							<CarouselItem
								key={`detail-image-${imageIndex}`}
								className="pl-0"
							>
								<div className="relative aspect-video w-full bg-muted/20">
									<Image
										src={imageUrl}
										alt={`${project.title} detailed view ${
											imageIndex + 1
										}`}
										fill
										className="object-contain rounded-lg transition-transform duration-300 hover:scale-[1.02]"
										loading="lazy"
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
										onError={() =>
											console.warn(
												`Failed to load detail image: ${imageUrl}`
											)
										}
									/>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>

					{hasMultipleImages && (
						<>
							<CarouselPrevious className="left-4" />
							<CarouselNext className="right-4" />
						</>
					)}
				</Carousel>

				{hasMultipleImages && (
					<div className="absolute bottom-4 right-4 bg-black/60 text-white px-2 py-1 rounded text-sm">
						{displayImages.length} images
					</div>
				)}
			</div>
		);
	};

	const renderProjectMetadata = () => (
		<div className="flex flex-wrap gap-3 items-center">
			<Badge
				className={getCategoryColor(project.category)}
				variant="default"
			>
				{project.category}
			</Badge>
			<Badge
				className={getStatusColor(project.status)}
				variant="secondary"
			>
				{project.status}
			</Badge>
			{project.role && (
				<div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
					<User className="h-4 w-4" />
					<span className="font-medium">{project.role}</span>
				</div>
			)}
		</div>
	);

	const renderTechnologyStack = () => {
		if (!project.tech?.length) return null;

		return (
			<div className="space-y-3">
				<h3 className="text-lg font-semibold text-foreground">
					Technology Stack
				</h3>
				<div className="flex flex-wrap gap-2">
					{project.tech.map((technology, techIndex) => (
						<Badge
							key={`tech-detail-${techIndex}`}
							variant="outline"
							className="font-medium px-3 py-1"
						>
							{technology}
						</Badge>
					))}
				</div>
			</div>
		);
	};

	const renderKeyFeatures = () => {
		if (!project.features?.length) return null;

		return (
			<div className="space-y-3">
				<h3 className="text-lg font-semibold text-foreground">
					Key Features & Highlights
				</h3>
				<ul>
					{project.features.map((feature, featureIndex) => (
						<li
							key={`feature-${featureIndex}`}
							className="flex items-start gap-3 p-3 rounded-lg"
						>
							<div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0" />
							<span className="text-sm leading-relaxed">
								{feature}
							</span>
						</li>
					))}
				</ul>
			</div>
		);
	};

	const renderActionButtons = () => {
		const hasGithub = Boolean(project.github);
		const hasLiveDemo = Boolean(project.live);

		if (!hasGithub && !hasLiveDemo) return null;

		return (
			<div className="flex flex-col sm:flex-row gap-3 pt-2">
				{hasGithub && (
					<Button
						onClick={() => openExternalLink(project.github)}
						className="flex-1 gap-2 h-11"
						size="default"
					>
						<Github className="h-5 w-5" />
						View Source Code
					</Button>
				)}
				{hasLiveDemo && (
					<Button
						variant="outline"
						onClick={() => openExternalLink(project.live)}
						className="flex-1 gap-2 h-11"
						size="default"
					>
						<ExternalLink className="h-5 w-5" />
						Open Live Demo
					</Button>
				)}
			</div>
		);
	};

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>
				<Button variant="secondary" size="sm" className="w-full gap-2">
					<Eye className="h-4 w-4" />
					View Details
				</Button>
			</DialogTrigger>

			<DialogContent className="max-w-5xl max-h-[90vh] p-0">
				<ScrollArea className="max-h-[90vh] p-6">
					{/* Dialog Header */}
					<DialogHeader className="space-y-4 pb-6">
						<DialogTitle className="text-3xl font-bold leading-tight">
							{project.title}
						</DialogTitle>
						<DialogDescription className="text-base leading-relaxed text-muted-foreground">
							{project.description}
						</DialogDescription>
					</DialogHeader>

					<div className="space-y-8">
						{/* Project Image Gallery */}
						<section>{renderImageGallery()}</section>

						{/* Project Metadata */}
						<section>{renderProjectMetadata()}</section>

						{/* Detailed Description */}
						{project.detailedDescription && (
							<section className="space-y-3">
								<h3 className="text-lg font-semibold text-foreground">
									Project Overview
								</h3>
								<div className="prose prose-sm max-w-none">
									<p className="text-muted-foreground leading-relaxed">
										{project.detailedDescription}
									</p>
								</div>
							</section>
						)}

						{/* Technology Stack */}
						{renderTechnologyStack()}

						{/* Key Features */}
						{renderKeyFeatures()}

						{/* Action Buttons */}
						<section className="border-t pt-6">
							{renderActionButtons()}
						</section>
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
};

export default ProjectDetailDialog;
