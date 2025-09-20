"use client";

import {
	useTheme as useNextTheme,
	ThemeProvider as NextThemesProvider,
} from "next-themes";
import * as React from "react";

// Define available themes and colors
enum IThemeMode {
	LIGHT = "light",
	DARK = "dark",
	SYSTEM = "system",
}

enum IColorScheme {
	DEFAULT = "default",
	RED = "red",
	ROSE = "rose",
	ORANGE = "orange",
	BLUE = "blue",
	GREEN = "green",
	VIOLET = "violet",
	YELLOW = "yellow",
}

interface IThemeContextType {
	themeMode: IThemeMode;
	setThemeMode: (theme: IThemeMode) => void;
	colorScheme: IColorScheme;
	setColorScheme: (color: IColorScheme) => void;
	resolvedTheme?: IThemeMode.LIGHT | IThemeMode.DARK;
}

const ThemeContext = React.createContext<IThemeContextType | undefined>(
	undefined
);

interface IThemeProviderProps {
	children: React.ReactNode;
	defaultTheme?: IThemeMode;
	defaultColorScheme?: IColorScheme;
	storageKey?: string;
	colorStorageKey?: string;
}

function ThemeProvider({
	children,
	defaultTheme = IThemeMode.DARK,
	defaultColorScheme = IColorScheme.DEFAULT,
	storageKey = "ui-theme",
	colorStorageKey = "ui-color-scheme",
}: IThemeProviderProps) {
	const { theme, setTheme, resolvedTheme } = useNextTheme();
	const [colorScheme, setColorSchemeState] =
		React.useState<IColorScheme>(defaultColorScheme);
	const [isInitialized, setIsInitialized] = React.useState(false);

	// Initialize all preferences from localStorage or use defaults
	React.useEffect(() => {
		// Get color scheme from localStorage
		const storedColorScheme = localStorage.getItem(colorStorageKey);

		if (
			storedColorScheme &&
			Object.values(IColorScheme).includes(
				storedColorScheme as IColorScheme
			)
		) {
			setColorSchemeState(storedColorScheme as IColorScheme);
		} else {
			localStorage.setItem(colorStorageKey, defaultColorScheme);
		}

		// Get theme from localStorage
		const storedTheme = localStorage.getItem(storageKey);
		if (
			storedTheme &&
			Object.values(IThemeMode).includes(storedTheme as IThemeMode)
		) {
			setTheme(storedTheme as IThemeMode);
		} else {
			localStorage.setItem(storageKey, defaultTheme);
			setTheme(defaultTheme);
		}

		setIsInitialized(true);
	}, [
		colorStorageKey,
		storageKey,
		setTheme,
		defaultTheme,
		defaultColorScheme,
	]);

	// Update document class based on theme and color scheme
	React.useEffect(() => {
		if (!isInitialized) return;

		const root = window.document.documentElement;

		// Remove all color classes
		Object.values(IColorScheme).forEach((color) => {
			if (color !== IColorScheme.DEFAULT) {
				root.classList.remove(color);
			}
		});

		// Remove theme classes
		root.classList.remove(IThemeMode.LIGHT, IThemeMode.DARK);

		// Add current color scheme class
		if (colorScheme !== IColorScheme.DEFAULT) {
			root.classList.add(colorScheme);
		}

		// Add theme class (light/dark)
		if (resolvedTheme) {
			root.classList.add(resolvedTheme);
		} else if (theme && theme !== IThemeMode.SYSTEM) {
			root.classList.add(theme);
		}
	}, [colorScheme, resolvedTheme, theme, isInitialized]);

	// Set color scheme and persist to localStorage
	const setColorScheme = React.useCallback(
		(color: IColorScheme) => {
			setColorSchemeState(color);
			localStorage.setItem(colorStorageKey, color);
		},
		[colorStorageKey]
	);

	// Set theme mode and persist to localStorage
	const setThemeMode = React.useCallback(
		(theme: IThemeMode) => {
			setTheme(theme);
			localStorage.setItem(storageKey, theme);
		},
		[setTheme, storageKey]
	);

	// Get the resolved theme (light/dark, not system)
	const currentResolvedTheme: IThemeMode.LIGHT | IThemeMode.DARK | undefined =
		resolvedTheme === IThemeMode.LIGHT
			? IThemeMode.LIGHT
			: resolvedTheme === IThemeMode.DARK
			? IThemeMode.DARK
			: undefined;

	const value: IThemeContextType = {
		themeMode: (theme as IThemeMode) || defaultTheme,
		setThemeMode,
		colorScheme,
		setColorScheme,
		resolvedTheme: currentResolvedTheme,
	};

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
}

// Root provider that wraps both next-themes and our custom theme context
const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<NextThemesProvider
			attribute="class"
			defaultTheme={IThemeMode.SYSTEM}
			enableSystem
			disableTransitionOnChange
		>
			<ThemeProvider>{children}</ThemeProvider>
		</NextThemesProvider>
	);
};

// Custom hook to use the theme context
const useTheme = () => {
	const context = React.useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};

export { useTheme, ThemeContextProvider, IThemeMode, IColorScheme };
