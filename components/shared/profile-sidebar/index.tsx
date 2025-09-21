import {
	FaCode,
	FaGithub,
	FaInstagram,
	FaLinkedin,
	FaYoutube,
} from "react-icons/fa";
import {
	IThemeMode,
	useTheme,
} from "@/components/providers/context/theme-context";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Bug, BugPlay, CodeXml } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import RotatingIcon from "@/components/ui/RotatingIcon";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { useLanguage } from "@/components/providers/context/language-context";

export const SocialMedias = [
	{ link: "#", icon: FaGithub },
	{ link: "#", icon: FaCode },
	{ link: "#", icon: FaLinkedin },
	{ link: "#", icon: FaYoutube },
	{ link: "#", icon: FaInstagram },
];

interface InfoSectionProps {
	title: string;
	description: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, description }) => (
	<div className="grid grid-cols-1">
		<label className="text-sm text-muted-foreground">{title}:</label>
		<label className="text-base">{description}</label>
	</div>
);

export const ProfileHeader: React.FC<{ name: string; title: string }> = ({
	name,
	title,
}) => (
	<div className="flex justify-start items-start gap-5">
		<div className="flex justify-center items-center gap-0 w-[60px] h-[60px] border overflow-hidden rounded-xl">
			<RotatingIcon
				icons={[Bug, BugPlay, CodeXml]}
				iconClassName="!w-full !h-full"
				rotationInterval={2000}
				auto={true}
				initial={{ y: "100%", opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: "-120%", opacity: 0 }}
			/>
		</div>
		<div className="flex justify-start items-start flex-col text-2xl max-xl:text-xl">
			{name}
			<span className="text-muted-foreground text-sm">{title}</span>
		</div>
	</div>
);

export const SocialIcons: React.FC = () => (
	<div className="flex justify-start items-center gap-3 w-full">
		{SocialMedias.map((item, index) => (
			<div
				className="w-full aspect-square relative rounded-full transition-all duration-300 overflow-hidden border-[1px] flex justify-center items-center p-3 hover:bg-primary max-w-[50px] hover:text-primary-foreground"
				key={item.link + index}
			>
				<item.icon className="w-full h-full" />
			</div>
		))}
	</div>
);

export const SideBarContent: React.FC = () => {
	const { dictionary } = useLanguage();
	const { themeMode } = useTheme();

	return (
		<>
			{/* Large screens (lg and above) */}
			<SpotlightCard className={`w-full h-auto relative top-5 !bg-transparent !backdrop-blur-sm grid grid-cols-1 gap-4 max-w-[500px] max-xl:hidden max-md:grid ${
				themeMode === IThemeMode.LIGHT ? "!border-gray-200" : ""
			}`}>
				<ProfileHeader
					name={dictionary?.general?.pawanKumar}
					title={dictionary?.general?.softwareEngineer}
				/>
				<div className="w-full aspect-square relative rounded-xl overflow-hidden">
					<Image src="/avatar.jpg" alt="avatar" fill />
				</div>
				<Separator />
				<InfoSection
					title={dictionary?.general?.specialization?.title}
					description={
						dictionary?.general?.specialization?.description
					}
				/>
				<InfoSection
					title={dictionary?.general?.basedIn?.title}
					description={dictionary?.general?.basedIn?.description}
				/>
				<SocialIcons />
				<Separator />
				<Button className="w-full h-auto py-5 px-8 rounded-full text-base">
					{dictionary?.general?.letsWorkTogether}
				</Button>
			</SpotlightCard>

			{/* Medium screens (md to lg) */}
			<SpotlightCard
				className={`w-full h-auto relative top-5 !bg-transparent !backdrop-blur-sm grid grid-cols-[250px_1px_1fr] gap-4 xl:hidden max-md:hidden ${
					themeMode === IThemeMode.LIGHT ? "!border-gray-200" : ""
				}`}
			>
				<div className="grid grid-cols-1 gap-5">
					<div className="relative rounded-xl overflow-hidden w-full aspect-square">
						<Image src="/avatar.jpg" alt="avatar" fill />
					</div>
					<SocialIcons />
				</div>
				<Separator orientation="vertical" />
				<div className="grid grid-cols-1 gap-4">
					<ProfileHeader
						name={dictionary?.general?.pawanKumar}
						title={dictionary?.general?.softwareEngineer}
					/>
					<InfoSection
						title={dictionary?.general?.specialization?.title}
						description={
							dictionary?.general?.specialization?.description
						}
					/>
					<InfoSection
						title={dictionary?.general?.basedIn?.title}
						description={dictionary?.general?.basedIn?.description}
					/>
					<Separator />
					<Button className="w-full h-auto py-5 px-8 rounded-full text-base">
						{dictionary?.general?.letsWorkTogether}
					</Button>
				</div>
			</SpotlightCard>
		</>
	);
};
