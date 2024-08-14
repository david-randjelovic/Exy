import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'exy-language-dropdown',
  standalone: true,
  imports: [DropdownModule, FormsModule, TranslateModule],
  templateUrl: './language-dropdown.component.html',
  styleUrl: './language-dropdown.component.css'
})
export class LanguageDropdownComponent {
  public languageService = inject(LanguageService);
  public languages: {name: string, code: string}[] = [{name: 'EN', code: 'en'}, {name: 'SR', code: 'sr'}];

  constructor(private _translate: TranslateService) {
    this.languageService.selectedLanguage.set({name: localStorage.getItem('exyl')?.toLocaleUpperCase() ?? 'en', code: localStorage.getItem('exyl') ?? 'en'})
    effect(() => {
      localStorage.setItem('exyl', this.languageService.selectedLanguage().code);
      this._translate.use(this.languageService.selectedLanguage().code);
    }, { allowSignalWrites: true })
  }
}
