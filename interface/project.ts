export interface Project {
	id: string;
	title: string;
	category: string;
	images: string[];
	description: string;
	detailedDescription: string;
	tech: string[];
	features: string[];
	github: string;
	live: string;
	status: string;
	completionDate?: string;
	role?: string;
}

export interface ProjectCardProps {
	project: Project;
}
