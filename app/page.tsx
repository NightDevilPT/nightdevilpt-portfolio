"use client";

import AboutPage from "@/components/pages/about";
import ContactPage from "@/components/pages/contact";
import HomePage from "@/components/pages/home";
import PortfolioPage from "@/components/pages/portfolio";
import ResumePage from "@/components/pages/resume";

export default function Home() {
	return (
		<div>
			<HomePage />
			<PortfolioPage />
			<AboutPage />
			<ResumePage />
			<ContactPage />
		</div>
	);
}
