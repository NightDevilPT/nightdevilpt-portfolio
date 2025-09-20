import {
	IThemeMode,
	useTheme,
} from "@/components/providers/context/theme-context";
import { useEffect, useState } from "react";
import { ColorSchemas } from "@/interface/color-schema";

export const usePrimaryColor = (): string => {
	const { themeMode, colorScheme } = useTheme(); 
	const [primaryColor, setPrimaryColor] = useState<string>(
		ColorSchemas["default"].light.primary
	);

	useEffect(() => {
		const mode: "light" | "dark" =
			themeMode === IThemeMode.DARK ? "dark" : "light";
		const normalizedColorScheme = colorScheme.toLowerCase();
		const validColorSchemes = Object.keys(ColorSchemas);

		if (!validColorSchemes.includes(normalizedColorScheme)) {
			console.warn(
				`Invalid colorScheme: ${colorScheme}. Falling back to 'default'. Available schemes: ${validColorSchemes.join(
					", "
				)}`
			);
			setPrimaryColor(ColorSchemas["default"][mode].primary);
		} else {
			setPrimaryColor(ColorSchemas[normalizedColorScheme][mode].primary);
		}
	}, [themeMode, colorScheme]); // Re-run effect when themeMode or colorScheme changes

	return primaryColor;
};
