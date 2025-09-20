"use client";

import React, { ReactNode } from "react";
import { ThemeContextProvider } from "./context/theme-context";
import ClickSpark from "../ui/ClickSpark";
import { LanguageProvider } from "./context/language-context";
import LayoutProvider from "./layout-provide";

const RootProvider = ({ children }: { children: ReactNode }) => {
	return (
		<div className="w-full h-screen relative overflow-y-auto overflow-x-hidden">
			<ThemeContextProvider>
				<LanguageProvider>
					<ClickSpark
						sparkSize={10}
						sparkRadius={15}
						sparkCount={8}
						duration={400}
					>
						<LayoutProvider>{children}</LayoutProvider>
					</ClickSpark>
				</LanguageProvider>
			</ThemeContextProvider>
		</div>
	);
};

export default RootProvider;
