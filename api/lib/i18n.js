const i18next = require("i18next");

i18next.init({
  lng: "en",
  fallbackLng: "en",
  resources: {
    fr: {
      translation: {
        Hello: "Bonjour",
        "Hello {{name}}": "Bonjour {{name}}",
        "Hello {{name}}!": "Bonjour {{name}}!",
      },
    },
  },
});

module.exports = i18next;
