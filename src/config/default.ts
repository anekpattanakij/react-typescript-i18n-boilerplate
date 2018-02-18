import { I18nConfig } from './i18nConfig';

export class DefaultConfig {
    public static host:string  = process.env.NODE_HOST || 'localhost';
    public static port:string = process.env.PORT;
    public static app:object = {
      htmlAttributes: { lang: 'en' },
      title: 'React Cool Starter',
      titleTemplate: 'React Cool Starter - %s',
      meta: [
        {
          name: 'description',
          content: 'The best react universal starter boilerplate in the world.',
        },
      ],
    };
    public static i18n:I18nConfig = {
      whitelist: ['en', 'th'],
      fallbackLng: ['en'],
    };
  }

 

