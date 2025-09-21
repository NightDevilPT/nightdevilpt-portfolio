import {
	IColorScheme,
	useTheme,
} from "@/components/providers/context/theme-context";
import { cn } from "@/lib/utils";
import { CheckCheck } from "lucide-react";
import { Label } from "@/components/ui/label";
import { ColorSchemas } from "@/interface/color-schema";
import { useLanguage } from "@/components/providers/context/language-context";

const ColorPaletteSelector = () => {
	const { colorScheme, setColorScheme, resolvedTheme } = useTheme();
	const { dictionary } = useLanguage();
	const settingsDict = dictionary?.setting || {};

	const handleColorSchemeChange = (schemeKey: string) => {
		setColorScheme(schemeKey as IColorScheme);
	};

	return (
		<div className="space-y-4">
			<Label htmlFor="color-scheme">
				{settingsDict.colorScheme || "Color Scheme"}
			</Label>

			<div className="grid gap-4 grid-cols-2">
				{Object.entries(ColorSchemas).map(
					([schemeKey, colorSchemas]) => {
						const isSelected = colorScheme === schemeKey;
						const colorPalette =
							colorSchemas[resolvedTheme || "dark"];

						return (
							<div
								key={schemeKey}
								className={cn(
									"w-full p-3 rounded-lg border-2 cursor-pointer transition-all duration-200",
									"flex flex-col items-center gap-2",
									isSelected
										? "border-primary ring-2 ring-primary/20 shadow-md"
										: "border-muted hover:border-primary/50 hover:shadow-sm"
								)}
								onClick={() =>
									handleColorSchemeChange(schemeKey)
								}
							>
								{/* Color palette preview */}
								<div className="grid grid-cols-6 gap-1 w-full">
									{Object.entries(colorPalette).map(
										([colorKey, colorValue]) => (
											<div
												key={colorKey}
												className={cn(
													"w-5 h-5 rounded-sm border border-border"
												)}
												style={{
													backgroundColor: colorValue,
												}}
												title={`${colorKey}: ${colorValue}`}
											/>
										)
									)}
								</div>

								<div className="grid grid-cols-3 gap-4 place-content-center place-items-center">
									{/* Scheme name */}
									<span
										className={`text-xs ${
											isSelected
												? "col-span-2"
												: "col-span-full"
										} font-medium capitalize mt-1`}
									>
										{schemeKey === "default"
											? settingsDict.default || "Default"
											: settingsDict[schemeKey] ||
											  schemeKey}
									</span>
									{/* Selection indicator */}
									{isSelected && (
										<div className="self-end -mt-1 -mr-1">
											<CheckCheck className="w-4 h-4 text-primary" />
										</div>
									)}
								</div>
							</div>
						);
					}
				)}
			</div>
		</div>
	);
};

export default ColorPaletteSelector;
