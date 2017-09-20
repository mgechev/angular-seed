// import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';
//
// export class TranslationProviders {
//
//   public getTranslationFile = (): Promise<any> => {
//     const noProviders: Object[] = [];
//
//     // Define a way to retrieve the local information
//     const locale: string = 'en-US';
//
//     // Set the directory to the translation files
//     const file: string = `../assets/locale/messages.${locale}.xlf`;
//
//     if (!locale || locale === 'en-US') return Promise.resolve(noProviders);
//
//     return new Promise(function (resolve, reject) {
//       const xhr = new XMLHttpRequest;
//       xhr.open('GET', file);
//       xhr.onload = (data: any) => resolve(
//         [
//           { provide: TRANSLATIONS, useValue: data.target.response },
//           { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
//           { provide: LOCALE_ID, useValue: locale }
//         ]
//       );
//       xhr.onerror = () => reject(noProviders);
//       xhr.send();
//     });
//   }
// }
