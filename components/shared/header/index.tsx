import {
	Dictionary,
	useLanguage,
} from "@/components/providers/context/language-context";
import { Button } from "@/components/ui/button";
import { DockItemData } from "@/components/ui/Dock";
import {
	Home,
	MessageCircle,
	NotebookTabs,
	SquareKanban,
	User,
} from "lucide-react";
import React, { cloneElement, useState, useMemo } from "react";

const Header = () => {
	const { dictionary } = useLanguage();
	const [activeItem, setActiveItem] = useState<string>("Home");

	const routes = useMemo(() => {
		if (!dictionary) return [];

		const baseRoutes = [
			{
				label: dictionary?.navigation?.home || "Home",
				icon: <Home className="w-6 h-6" />,
				className: "border-primary",
			},
			{
				label: dictionary?.navigation?.about || "About",
				icon: <User className="w-6 h-6" />,
				className: "border-primary",
			},
			{
				label: dictionary?.navigation?.projects || "Projects",
				icon: <SquareKanban className="w-6 h-6" />,
				className: "border-primary",
			},
			{
				label: dictionary?.navigation?.contact || "Contact",
				icon: <NotebookTabs className="w-6 h-6" />,
				className: "border-primary",
			},
		];

		// Add onClick handler to each route
		return baseRoutes.map((item) => ({
			...item,
			onClick: () => {
				setActiveItem(item.label);
				// Add your navigation logic here
			},
		}));
	}, [dictionary]);

	return (
		<div className="w-full h-auto sticky top-0 left-0 flex justify-end items-center gap-5 p-4 max-xl:hidden">
			<div className="flex justify-center items-center gap-3">
				{routes?.map((item, index) => (
					<Button
						key={`${item.label}-${index}`}
						variant={
							item.label === activeItem ? "default" : "outline"
						}
						className={`flex !border-[1px] justify-center items-center gap-3 !p-6 rounded-full group transition-all duration-200 ${
							activeItem === item.label
								? "!border-primary"
								: "!bg-transparent"
						} backdrop-blur-xl`}
						onClick={() => {
							setActiveItem(item.label);
							item.onClick();
						}}
					>
						{cloneElement(
							item.icon as React.ReactElement<{
								className?: string;
							}>,
							{
								className: `!w-5 !h-5 ${
									activeItem === item.label
										? "!text-primary-foreground"
										: ""
								}`,
							}
						)}
						<div
							className={`relative overflow-hidden text-base ${
								activeItem === item.label
									? "!text-primary-foreground"
									: ""
							}`}
						>
							<p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
								{item.label}
							</p>
							<p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
								{item.label}
							</p>
						</div>
					</Button>
				))}
			</div>

			<Button
				className="flex justify-center items-center gap-3 !py-6 !px-8 rounded-full text-xl bg-primary text-primary-foreground max-lg:hidden"
				onClick={() => setActiveItem("Let's Talk")}
			>
				{dictionary?.general?.letsTalk || "Let's Talk"}{" "}
				<MessageCircle className="!w-5 !h-5" />
			</Button>
		</div>
	);
};

export default Header;
