import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	IThemeMode,
	useTheme,
} from "@/components/providers/context/theme-context";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { MoonIcon, Settings, SunIcon } from "lucide-react";
import ColorPaletteSelector from "./_components/color_palates";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/components/providers/context/language-context";

export function SettingPage() {
	const { dictionary } = useLanguage();
	const { themeMode, setThemeMode } = useTheme();

	// Get settings translations
	const settingsDict = useMemo(() => dictionary?.setting || {}, [dictionary]);
	const generalDict = useMemo(() => dictionary?.general || {}, [dictionary]);

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					className="fixed bottom-10 right-10 rounded-full w-16 h-16"
					variant="default"
				>
					<Settings className="animate-spin !w-6 !h-6" />
				</Button>
			</SheetTrigger>
			<SheetContent className="overflow-y-auto">
				<SheetHeader className="mb-6">
					<SheetTitle>{settingsDict.title || "Settings"}</SheetTitle>
					<SheetDescription>
						{generalDict.letsWorkTogether ||
							"Customize your experience"}
					</SheetDescription>
				</SheetHeader>

				<div className="space-y-8 px-5">
					{/* Theme Settings */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">
							{settingsDict.theme || "Theme"}
						</h3>

						<div className="space-y-3 grid grid-cols-2 gap-5">
							<Button
								variant={
									themeMode === IThemeMode.LIGHT
										? "default"
										: "outline"
								}
								onClick={() => setThemeMode(IThemeMode.LIGHT)}
							>
								<SunIcon />
							</Button>
							<Button
								variant={
									themeMode === IThemeMode.DARK
										? "default"
										: "outline"
								}
								onClick={() => setThemeMode(IThemeMode.DARK)}
							>
								<MoonIcon />
							</Button>
						</div>

						<div className="space-y-3">
							<ColorPaletteSelector />
						</div>
					</div>

					{/* Language Settings */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">
							{settingsDict.language || "Language"}
						</h3>

						<div className="space-y-3">
							<LanguageSwitcher
								variant={"outline"}
								className="w-full"
								align="start"
							/>
						</div>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
