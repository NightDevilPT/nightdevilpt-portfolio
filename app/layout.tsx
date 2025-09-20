import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RootProvider from "@/components/providers";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Pawan Kumar - Full Stack Developer",
	description:
		"Portfolio of Pawan Kumar, a Full Stack Developer specializing in React, Next.js, Node.js and modern web development technologies.",
	keywords: [
		"Pawan Kumar",
		"Full Stack Developer",
		"React Developer",
		"Next.js Developer",
		"Node.js Developer",
		"JavaScript Developer",
		"TypeScript Developer",
		"Web Developer",
		"Frontend Developer",
		"Backend Developer",
		"Portfolio",
	],
	authors: [{ name: "Pawan Kumar" }],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Zalando+Sans+Expanded:ital,wght@0,200..900;1,200..900&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<RootProvider>{children}</RootProvider>
			</body>
		</html>
	);
}
