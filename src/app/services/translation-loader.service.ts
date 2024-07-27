import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class TranslationLoader implements TranslateLoader {
  public http = inject(HttpClient);

  getTranslation(lang: string): Observable<any> {

    if (!lang) {
      lang = 'en';
    }
    let fetchLang: any = this.http.get(`./assets/i18n/${lang}.json`).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        if (error.status === 404) {
          fetchLang = this.http.get('./assets/i18n/en.json');
          return fetchLang;
        }
        return this.http.get('./assets/i18n/en.json');
      })
    );
    return fetchLang;
  }
}
