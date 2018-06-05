import * as i18n from 'i18next';
import * as XHR from 'i18next-xhr-backend';
import * as Backend from 'i18next-node-fs-backend';
import { LanguageDetector } from 'i18next-express-middleware';
import { reactI18nextModule } from 'react-i18next';
import { Config } from '../config';

const options = {
  whitelist: Config.i18n.whitelist,
  fallbackLng: Config.i18n.fallbackLng,

  // have a common namespace used around the full app
  ns: ['common'],
  defaultNS: 'common',

  debug: true,

  interpolation: {
    escapeValue: false, // not needed for react!!
  },

  backend: {
    loadPath: 'assets/locales/{{lng}}/{{ns}}.json',
    addPath: 'assets/locales/add/{{lng}}/{{ns}}.json',
    jsonIndent: 2,
  },

  react: {
    wait: false,
  },
};

i18n
  .use(XHR)
  .use(Backend)
  .use(LanguageDetector)
  .use(reactI18nextModule);

if (!i18n.isInitialized) {
  i18n.init(options);
}

export default i18n;
