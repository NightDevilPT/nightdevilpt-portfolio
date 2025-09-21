"use client";

import Shuffle from "../ui/Shuffle";
import Particles from "../ui/Particles";
import Header from "../shared/header";
import React, { ReactNode } from "react";
import { useLanguage } from "./context/language-context";
import { SideBarContent } from "../shared/profile-sidebar";

const LayoutProvider = ({ children }: { children: ReactNode }) => {
	const { isLoading, dictionary } = useLanguage();
	
	return (
		<div className="w-full h-screen relative flex justify-center items-center">
			<Particles
				particleCount={800}
				particleSpread={8}
				speed={0.2}
				particleBaseSize={150}
				moveParticlesOnHover={true}
				alphaParticles={false}
				disableRotation={false}
				className="w-full h-full !absolute left-0 top-0 -z-50"
			/>
			<div className="w-full h-full absolute backdrop-blur-xs left-0 to-0 -z-40" />
			{isLoading ? (
				<div className="w-full h-full flex justify-center items-center bg-background">
					<Shuffle
						text={dictionary?.general?.loading || "Loading..."}
						shuffleDirection="right"
						duration={0.35}
						animationMode="evenodd"
						shuffleTimes={1}
						ease="power3.out"
						stagger={0.08}
						threshold={0.1}
						loop
						className="custom-font"
					/>
				</div>
			) : (
				<div className="container h-full w-full grid grid-cols-[350px_1fr] max-xl:grid-cols-1 gap-8 relative z-10 py-10 no-scrollbar overflow-y-auto">
					<div className="w-full h-full flex justify-start items-start max-md:justify-center max-sm:px-4">
						{<SideBarContent />}
					</div>
					<div className="w-full h-full xl:overflow-y-auto no-scrollbar relative top-5">
						<div className="sticky top-0 left-0 z-50">
							{<Header />}
						</div>
						<div className="h-auto max-sm:px-4 overflow-hidden">
							{children}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default LayoutProvider;
