import { Component, effect, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-language-dropdown',
  standalone: true,
  imports: [DropdownModule, FormsModule, TranslateModule],
  templateUrl: './language-dropdown.component.html',
  styleUrl: './language-dropdown.component.css'
})
export class LanguageDropdownComponent {
  public languages: {name: string, code: string}[] = [{name: 'EN', code: 'en'}, {name: 'SR', code: 'sr'}];
  public selectedLanguage = signal({name: 'EN', code: 'en'});

  constructor(private _translate: TranslateService) {
    this.selectedLanguage.set({name: localStorage.getItem('exyl')?.toLocaleUpperCase() ?? 'en', code: localStorage.getItem('exyl') ?? 'en'})
    effect(() => {
      localStorage.setItem('exyl', this.selectedLanguage().code);
      this._translate.use(this.selectedLanguage().code);
    })
  }
}
