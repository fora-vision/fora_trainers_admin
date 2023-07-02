import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ruTranslation from './locales/ru/translation.json';
import enTranslation from './locales/en/translation.json';
import Backend from 'i18next-http-backend'
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
    en: {
        translation: enTranslation,
    },
    ru: {
        translation: ruTranslation,
    },
};

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "ru",
    });

export default i18n;
