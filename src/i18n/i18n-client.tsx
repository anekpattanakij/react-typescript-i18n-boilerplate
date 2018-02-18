import * as i18n from 'i18next';
import * as XHR from 'i18next-xhr-backend';
import { LanguageDetector } from 'i18next-express-middleware';
import { reactI18nextModule } from 'react-i18next';
import { Config } from '../config';

const options = {
  whitelist: Config.configSet.i18n.whitelist,
  fallbackLng: Config.configSet.i18n.fallbackLng,

  // have a common namespace used around the full app
  ns: ['common'],
  defaultNS: 'common',

  debug: true,

  interpolation: {
    escapeValue: false, // not needed for react!!
  },

  backend: {
    loadPath: '/assets/locales/{{lng}}/{{ns}}.json',
    addPath: 'assets/locales/add/{{lng}}/{{ns}}',
    jsonIndent: 2,
  },

  react: {
    wait: true,
  },
};

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(reactI18nextModule);

if (!i18n.isInitialized) {
  i18n.init(options);
}

export default i18n;
