import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';

export function getTranslationProviders(): Promise<Object[]> {

  // Get the locale id from the global
  const locale: string = 'fr';

  // return no providers if fail to get translation file for locale
  const noProviders: Object[] = [];

  // No locale or U.S. English: no translation providers
  if (!locale || locale === 'en-US') {
    return Promise.resolve(noProviders);
  }

  // Ex: 'locale/messages.fr.xlf`
  const translationFile: string = `../assets/locale/messages.${locale}.xlf`;

  return getTranslationsWithSystemJs(translationFile)
    .then( (translations: string ) => [
      { provide: TRANSLATIONS, useValue: translations },
      { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
      { provide: LOCALE_ID, useValue: locale }
    ])
    .catch(() => noProviders); // ignore if file not found
}

declare var System: any;

function getTranslationsWithSystemJs(file: string) {
  return System.import(file + '!text'); // relies on text plugin
}
