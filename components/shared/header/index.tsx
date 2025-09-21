import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import React, {
	cloneElement,
	useState,
	useMemo,
	useEffect,
	ReactNode,
} from "react";
import { SiRescuetime } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProfileHeader, SocialIcons } from "../profile-sidebar";
import { Home, Menu, MessageCircle, SquareKanban, User } from "lucide-react";
import { useLanguage } from "@/components/providers/context/language-context";

interface NavigationButtonProps {
	item: {
		label: string;
		icon: ReactNode;
		link: string;
		id: string;
		className?: string;
		onClick?: () => void;
	};
	isActive: boolean;
	index: number;
}

const NavigationButton = ({ item, isActive, index }: NavigationButtonProps) => {
	return (
		<Button
			key={`${item.label}-${index}`}
			variant={isActive ? "default" : "outline"}
			className={`flex !border-[1px] justify-center items-center gap-3 !p-6 rounded-full group transition-all duration-200 ${
				isActive ? "!border-primary" : "!bg-transparent"
			} backdrop-blur-xl ${item.className || ""}`}
			onClick={item.onClick}
		>
			{cloneElement(
				item.icon as React.ReactElement<{ className?: string }>,
				{
					className: `!w-5 !h-5 ${
						isActive ? "!text-primary-foreground" : ""
					}`,
				}
			)}
			<div
				className={`relative overflow-hidden text-base ${
					isActive ? "!text-primary-foreground" : ""
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
	);
};

const Header = () => {
	const { dictionary } = useLanguage();
	const [activeItem, setActiveItem] = useState<string>("Home");

	// Function to handle smooth scrolling to sections
	const scrollToSection = (sectionId: string) => {
		const element = document.querySelector(sectionId);
		if (element) {
			element.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	};

	// Update active item based on scroll position
	useEffect(() => {
		const handleScroll = () => {
			const sections = ["home", "about", "portfolio", "resume"];
			const scrollPosition = window.scrollY + 100;

			for (const section of sections) {
				const element = document.getElementById(section);
				if (element) {
					const offsetTop = element.offsetTop;
					const offsetHeight = element.offsetHeight;

					if (
						scrollPosition >= offsetTop &&
						scrollPosition < offsetTop + offsetHeight
					) {
						setActiveItem(
							section === "home"
								? "Home"
								: section.charAt(0).toUpperCase() +
										section.slice(1)
						);
						break;
					}
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const routes = useMemo(() => {
		if (!dictionary) return [];

		const baseRoutes = [
			{
				label: dictionary?.navigation?.home || "Home",
				icon: <Home className="w-6 h-6" />,
				className: "border-primary",
				link: "#home",
				id: "home",
			},
			{
				label: dictionary?.navigation?.about || "About",
				icon: <User className="w-6 h-6" />,
				className: "border-primary",
				link: "#about",
				id: "about",
			},
			{
				label: dictionary?.portfolio?.portfolio || "Projects",
				icon: <SquareKanban className="w-6 h-6" />,
				className: "border-primary",
				link: "#portfolio",
				id: "portfolio",
			},
			{
				label: dictionary?.resume?.resume || "Resume",
				icon: <SiRescuetime className="w-6 h-6" />,
				className: "border-primary",
				link: "#resume",
				id: "resume",
			},
		];

		// Add onClick handler to each route
		return baseRoutes.map((item) => ({
			...item,
			onClick: () => {
				setActiveItem(item.label);
				scrollToSection(item.link);
			},
		}));
	}, [dictionary]);

	const handleLetsTalkClick = () => {
		setActiveItem("Let's Talk");
		scrollToSection("#contact");
	};

	return (
		<>
			<div className="w-full h-auto sticky top-0 left-0 flex justify-end items-center gap-5 p-4 max-xl:hidden z-50">
				<div className="flex justify-center items-center gap-3">
					{routes?.map((item, index) => (
						<NavigationButton
							key={`${item.label}-${index}`}
							item={item}
							isActive={item.label === activeItem}
							index={index}
						/>
					))}
				</div>

				<Button
					className="flex justify-center items-center gap-3 !py-6 !px-8 rounded-full text-xl bg-primary text-primary-foreground max-lg:hidden hover:bg-primary/90 transition-colors"
					onClick={handleLetsTalkClick}
				>
					{dictionary?.general?.letsTalk || "Let's Talk"}{" "}
					<MessageCircle className="!w-5 !h-5" />
				</Button>
			</div>

			<Sheet>
				<SheetTrigger className="fixed right-8 top-8 max-md:right-5 max-md:top-5 rounded-full p-5 bg-primary text-primary-foreground animate-bounce xl:hidden">
					<Menu />
				</SheetTrigger>
				<SheetContent className="!space-y-0 gap-0 px-4">
					<SheetHeader>
						<SheetTitle>
							<ProfileHeader
								name={dictionary?.general?.pawanKumar}
								title={dictionary?.general?.softwareEngineer}
							/>
						</SheetTitle>
					</SheetHeader>
					<Separator />
					<div className="grid !mt-8 flex-1 auto-rows-min gap-6 px-4">
						{routes?.map((item, index) => (
							<NavigationButton
								key={`${item.label}-${index}`}
								item={item}
								isActive={item.label === activeItem}
								index={index}
							/>
						))}
					</div>
					<Separator />
					<SheetFooter>
						<SocialIcons />
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</>
	);
};

export default Header;
