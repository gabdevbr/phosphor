import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  pt: {
    translation: {
      "title": "PHOSPHOR TERMINAL",
      "addApplication": "ADICIONAR APLICAÇÃO",
      "settings": "CONFIGURAÇÕES",
      "applicationName": "Nome da Aplicação",
      "applicationUrl": "URL da Aplicação",
      "applicationIcon": "Ícone da Aplicação",
      "save": "SALVAR",
      "cancel": "CANCELAR",
      "language": "Idioma",
      "customTitle": "Título Personalizado",
      "customTitleDesc": "Personalizar o título da aplicação",
      "phosphorIcons": "Ícones Fósforo",
      "phosphorIconsDesc": "Aplicar efeito terminal aos ícones",
      "noApplications": "NENHUMA APLICAÇÃO ENCONTRADA",
      "addFirstApp": "ADICIONE SUA PRIMEIRA APLICAÇÃO",
      "dragToReorder": "ARRASTE PARA REORDENAR",
      "dropImageHere": "ARRASTE UMA IMAGEM AQUI",
      "orClickToSelect": "OU CLIQUE PARA SELECIONAR",
      "clickToChange": "CLIQUE PARA ALTERAR",
      "open": "ABRIR",
      "edit": "EDITAR",
      "delete": "EXCLUIR",
      "editApplication": "EDITAR APLICAÇÃO",
      "confirmDelete": "CONFIRMAR EXCLUSÃO",
      "confirmDeleteMessage": "Tem certeza que deseja excluir esta aplicação?",
      "yes": "SIM",
      "no": "NÃO"
    }
  },
  en: {
    translation: {
      "title": "PHOSPHOR TERMINAL",
      "addApplication": "ADD APPLICATION",
      "settings": "SETTINGS",
      "applicationName": "Application Name",
      "applicationUrl": "Application URL",
      "applicationIcon": "Application Icon",
      "save": "SAVE",
      "cancel": "CANCEL",
      "language": "Language",
      "customTitle": "Custom Title",
      "customTitleDesc": "Customize the application title",
      "phosphorIcons": "Phosphor Icons",
      "phosphorIconsDesc": "Apply terminal effect to icons",
      "noApplications": "NO APPLICATIONS FOUND",
      "addFirstApp": "ADD YOUR FIRST APPLICATION",
      "dragToReorder": "DRAG TO REORDER",
      "dropImageHere": "DROP IMAGE HERE",
      "orClickToSelect": "OR CLICK TO SELECT",
      "clickToChange": "CLICK TO CHANGE",
      "open": "OPEN",
      "edit": "EDIT",
      "delete": "DELETE",
      "editApplication": "EDIT APPLICATION",
      "confirmDelete": "CONFIRM DELETE",
      "confirmDeleteMessage": "Are you sure you want to delete this application?",
      "yes": "YES",
      "no": "NO"
    }
  },
  es: {
    translation: {
      "title": "TERMINAL PHOSPHOR",
      "addApplication": "AGREGAR APLICACIÓN",
      "settings": "CONFIGURACIÓN",
      "applicationName": "Nombre de la Aplicación",
      "applicationUrl": "URL de la Aplicación",
      "applicationIcon": "Icono de la Aplicación",
      "save": "GUARDAR",
      "cancel": "CANCELAR",
      "language": "Idioma",
      "customTitle": "Título Personalizado",
      "customTitleDesc": "Personalizar el título de la aplicación",
      "phosphorIcons": "Iconos Fósforo",
      "phosphorIconsDesc": "Aplicar efecto terminal a los iconos",
      "noApplications": "NO SE ENCONTRARON APLICACIONES",
      "addFirstApp": "AGREGA TU PRIMERA APLICACIÓN",
      "dragToReorder": "ARRASTRA PARA REORDENAR",
      "dropImageHere": "ARRASTRA UNA IMAGEN AQUÍ",
      "orClickToSelect": "O HAZ CLIC PARA SELECCIONAR",
      "clickToChange": "HAZ CLIC PARA CAMBIAR",
      "open": "ABRIR",
      "edit": "EDITAR",
      "delete": "ELIMINAR",
      "editApplication": "EDITAR APLICACIÓN",
      "confirmDelete": "CONFIRMAR ELIMINACIÓN",
      "confirmDeleteMessage": "¿Estás seguro de que deseas eliminar esta aplicación?",
      "yes": "SÍ",
      "no": "NO"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;