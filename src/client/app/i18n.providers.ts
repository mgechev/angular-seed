import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';

export class TranslationProviders {

  public getTranslationFile = (): Promise<any> => {
    let noProviders: Object[] = [];
    let locale: string = localStorage.getItem('lang') || 'en-US';
    let file: string = `../assets/locale/messages.${locale}.xlf`;

    if(!locale || locale === 'en-US') return Promise.resolve(noProviders);

    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest;
      xhr.open('GET', file);
      xhr.onload = (data: any) => resolve(
        [
          { provide: TRANSLATIONS, useValue: data.target.response },
          { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
          { provide: LOCALE_ID, useValue: locale }
        ]
      );
      xhr.onerror = () => reject(noProviders);
      xhr.send();
    });
  }
};
