import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getStatusColor = (status: string) => {
	switch (status.toLowerCase()) {
		case "completed":
			return "bg-green-100 text-green-800 hover:bg-green-200";
		case "in-progress":
			return "bg-blue-100 text-blue-800 hover:bg-blue-200";
		default:
			return "bg-gray-100 text-gray-800 hover:bg-gray-200";
	}
};

export const getCategoryColor = (category: string) => {
	switch (category.toLowerCase()) {
		case "fullstack":
			return "bg-purple-100 text-purple-800 hover:bg-purple-200";
		case "frontend":
			return "bg-orange-100 text-orange-800 hover:bg-orange-200";
		case "backend":
			return "bg-red-100 text-red-800 hover:bg-red-200";
		default:
			return "bg-gray-100 text-gray-800 hover:bg-gray-200";
	}
};

export const handleDownload = () => {
	const link = document.createElement("a");
	link.href = "/resume.pdf"; // path inside public/
	link.download = "Pawan_Kumar_Resume.pdf"; // file name for download
	link.click();
};
