"use client";

import React from "react";
import { Download } from "lucide-react";
import { IBaseItem } from "@/interface/base.interface";
import SpotlightCard from "@/components/ui/SpotlightCard";
import BasePage, { AnimatedButton } from "@/components/shared/base-page";
import { useLanguage } from "@/components/providers/context/language-context";
import { IThemeMode, useTheme } from "@/components/providers/context/theme-context";

const ContactPage: React.FC = () => {
	const { dictionary } = useLanguage();
	const { themeMode } = useTheme();

	const renderPersonalDetailItem = (detail: IBaseItem, index: number) => (
		<div
			key={`detail-${detail.title}-${index}`}
			className="flex justify-start items-start flex-col gap-1 p-4 rounded-lg"
		>
			<span className="text-sm">{detail.title}</span>
			<span className="text-base font-semibold text-muted-foreground">
				{detail.value}
			</span>
		</div>
	);

	return (
		<BasePage
			id="contact"
			title={dictionary?.contact?.title}
			titleTags={dictionary?.contact?.contact}
		>
			<p className="text-xl leading-relaxed">
				{dictionary?.contact?.description}
			</p>
			<SpotlightCard className={`bg-transparent backdrop-blur-xl mt-12 mb-20 ${
				themeMode === IThemeMode.LIGHT ? "!border-gray-200" : ""
			}`}>
				<form className="w-full h-auto">
					<div className="grid grid-cols-2 gap-8 ">
						<input
							type="text"
							placeholder={dictionary?.contact?.form?.yourName}
							className="text-xl text-muted-foreground outline-0 px-4 py-2 border-0 border-b-2 border-muted  focus:border-b-primary max-md:col-span-2"
						/>
						<input
							type="text"
							placeholder={dictionary?.contact?.form?.companyName}
							className="text-xl text-muted-foreground outline-0 px-4 py-2 border-0 border-b-2 border-muted  focus:border-b-primary  max-md:col-span-2"
						/>
						<input
							type="text"
							placeholder={
								dictionary?.contact?.form?.emailAddress
							}
							className="text-xl text-muted-foreground outline-0 px-4 py-2 border-0 border-b-2 border-muted  focus:border-b-primary max-md:col-span-2"
						/>
						<input
							type="text"
							placeholder={dictionary?.contact?.form?.phoneNumber}
							className="text-xl text-muted-foreground outline-0 px-4 py-2 border-0 border-b-2 border-muted  focus:border-b-primary max-md:col-span-2"
						/>
						<textarea
							placeholder={dictionary?.contact?.form?.description}
							className="text-xl h-32 max-h-32 min-h-32 text-muted-foreground outline-0 px-4 py-2 border-0 border-b-2 border-muted col-span-2 focus:border-b-primary max-md:col-span-2"
						/>
					</div>

					<AnimatedButton
						label={dictionary?.contact?.form?.sendMessage}
						icon={<Download className="w-4 h-4" />}
						className="!bg-primary hover:!bg-primary/90 transition-colors duration-200 mt-8"
					/>
				</form>
			</SpotlightCard>

			<div className="w-full h-auto grid grid-cols-3 max-md:grid-cols-1 gap-5 max-md:gap-0">
				{dictionary?.contact?.footer?.map(
					(items: IBaseItem, index: number) => {
						return renderPersonalDetailItem(items, index);
					}
				)}
			</div>
		</BasePage>
	);
};

export default ContactPage;
