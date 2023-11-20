import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import backend from "i18next-http-backend";

// Importing translation files

// Creating an object with the variables of imported translation files
const resources = {
  ENG: {
    translation: {
      home: "Home",
      savedRecipesLAST: "Saved Recipes",
      friends: "Friends",
      logout: "Log Out",
    },
  },
  ESP: {
    translation: {
      home: "Inicio",
      savedRecipesLAST: "Recetas guardadas",
      friends: "Amigos",
      logout: "Cerrar sesión",
    },
  },
  CHN: {
    translation: {
      home: "主页",
      savedRecipesLAST: "已保存的食谱",
      friends: "朋友",
      logout: "登出",
    },
  },
};

// i18N Initialization
i18n
  .use(initReactI18next)
  .use(backend) // Make sure to use the i18next-http-backend
  .init({
    resources,
    defaultNS: 'translation', // Specify the default namespace
    lng: 'ENG', // Set the default language to ENG
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
