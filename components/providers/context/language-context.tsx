// contexts/LanguageContext.tsx
"use client";

import * as React from "react";
import { getDictionary } from "@/i18n";

// Define available languages
export enum ILanguage {
	EN = "en",
	// Add more languages as needed
	FR = "fr",
	ES = "es",
	JA = "ja",
	DE = "de",
}

// Define the dictionary type based on your JSON structure
// You might want to create a more specific type based on your actual dictionary structure
export type Dictionary = Record<string, any>;

interface ILanguageContextType {
	language: ILanguage;
	setLanguage: (language: ILanguage) => void;
	dictionary: Dictionary | null;
	isLoading: boolean;
}

const LanguageContext = React.createContext<ILanguageContextType | undefined>(
	undefined
);

interface ILanguageProviderProps {
	children: React.ReactNode;
	defaultLanguage?: ILanguage;
	storageKey?: string;
}

function LanguageProvider({
	children,
	defaultLanguage = ILanguage.EN,
	storageKey = "ui-language",
}: ILanguageProviderProps) {
	const [language, setLanguageState] =
		React.useState<ILanguage>(defaultLanguage);
	const [dictionary, setDictionary] = React.useState<Dictionary | null>(null);
	const [isLoading, setIsLoading] = React.useState(true);

	// Initialize language from localStorage or use default
	React.useEffect(() => {
		const storedLanguage = localStorage.getItem(storageKey);
		if (
			storedLanguage &&
			Object.values(ILanguage).includes(storedLanguage as ILanguage)
		) {
			setLanguageState(storedLanguage as ILanguage);
		} else {
			localStorage.setItem(storageKey, defaultLanguage);
		}
	}, [storageKey, defaultLanguage]);

	// Load dictionary when language changes
	React.useEffect(() => {
		const loadDictionary = async () => {
			setIsLoading(true);
			try {
				const dict = await getDictionary(language as any);
				setDictionary(dict);
			} catch (error) {
				console.error("Failed to load dictionary:", error);
				// Fallback to English if the requested language fails
				if (language !== ILanguage.EN) {
					const fallbackDict = await getDictionary(ILanguage.EN);
					setDictionary(fallbackDict);
					setLanguageState(ILanguage.EN);
					localStorage.setItem(storageKey, ILanguage.EN);
				}
			} finally {
				setIsLoading(false);
			}
		};

		loadDictionary();
	}, [language, storageKey]);

	// Set language and persist to localStorage
	const setLanguage = React.useCallback(
		(lang: ILanguage) => {
			setLanguageState(lang);
			localStorage.setItem(storageKey, lang);
		},
		[storageKey]
	);

	const value: ILanguageContextType = {
		language,
		setLanguage,
		dictionary,
		isLoading,
	};

	return (
		<LanguageContext.Provider value={value}>
			{children}
		</LanguageContext.Provider>
	);
}

// Custom hook to use the language context
const useLanguage = () => {
	const context = React.useContext(LanguageContext);
	if (context === undefined) {
		throw new Error("useLanguage must be used within a LanguageProvider");
	}
	return context;
};

export { useLanguage, LanguageProvider };
