import { merge } from "lodash";

const dictionaries = {
	en: () => import("./locales/en.json").then((module) => module.default),
	es: () => import("./locales/es.json").then((module) => module.default),
	fr: () => import("./locales/fr.json").then((module) => module.default),
	ja: () => import("./locales/ja.json").then((module) => module.default),
	de: () => import("./locales/de.json").then((module) => module.default),
};

export const getDictionary = async (locale: keyof typeof dictionaries) => {
	const base = await import("./locales/base.json").then(
		(module) => module.default
	);
	const languageDict = await dictionaries[locale]();
	return merge({}, base, languageDict);
};
