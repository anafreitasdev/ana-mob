import { inject, Injectable } from '@angular/core';
import { TranslateService as NgxTranslateService } from '@ngx-translate/core';

const STORAGE_KEY = 'app_lang';
const SUPPORTED_LANGS = ['pt-BR', 'en-US'] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private ngxTranslate = inject(NgxTranslateService);
  constructor() {
    this.ngxTranslate.addLangs([...SUPPORTED_LANGS]);
    this.ngxTranslate.setDefaultLang('pt-BR');
  }

  init(): void {
    const saved = this.readStoredLang();
    const browser = this.ngxTranslate.getBrowserCultureLang();
    const lang = saved ?? this.normalize(browser) ?? 'pt-BR';
    this.setLang(lang);
  }

  setLang(lang: Lang): void {
    this.writeStoredLang(lang);
    this.ngxTranslate.use(lang);
  }

  get current(): Lang {
    return (this.ngxTranslate.currentLang as Lang) || 'pt-BR';
  }

  get supportedLangs(): readonly Lang[] {
    return SUPPORTED_LANGS;
  }

  private normalize(lang?: string | null): Lang | null {
    if (!lang) return null;
    if (lang.startsWith('pt')) return 'pt-BR';
    if (lang.startsWith('en')) return 'en-US';
    return null;
  }

  private readStoredLang(): Lang | null {
    try {
      return localStorage.getItem(STORAGE_KEY) as Lang | null;
    } catch {
      return null;
    }
  }

  private writeStoredLang(lang: Lang): void {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      return;
    }
  }
}
