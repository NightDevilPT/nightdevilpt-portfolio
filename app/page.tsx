"use client";

import HomePage from "@/components/pages/home";
import AboutPage from "@/components/pages/about";
import ResumePage from "@/components/pages/resume";
import ContactPage from "@/components/pages/contact";
import PortfolioPage from "@/components/pages/portfolio";
import { SettingPage } from "@/components/pages/settings";

export default function Home() {
	return (
		<div>
			<HomePage />
			<PortfolioPage />
			<AboutPage />
			<ResumePage />
			<ContactPage />
			<SettingPage />
		</div>
	);
}
