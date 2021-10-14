import i18n from "i18next";
import en_us from "../resources/en-US";
import es_co from "../resources/es-CO";
import es_ve from "../resources/es-VE";
import { initReactI18next } from "react-i18next";
import { store } from '../store';

const resources = {
  "en-US": en_us,
  "es-CO": es_co,
  "es-VE": es_ve
};

i18n
  .use(initReactI18next) 
  .init({
    resources: resources,
    lng: store.getState().config.language,
    ns: ["translations"],
    defaultNS: "translations",
    fallbackLng: store.getState().config.language,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
