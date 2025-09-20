"use client";

import AboutPage from "@/components/pages/about";
import HomePage from "@/components/pages/home";
import PortfolioPage from "@/components/pages/portfolio";

export default function Home() {
	return (
		<div>
			<HomePage />
			<PortfolioPage />
			<AboutPage />
		</div>
	);
}
