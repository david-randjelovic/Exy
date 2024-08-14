import { Injectable, signal } from "@angular/core";
import { IUser } from "../interfaces/user.interface";

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    public selectedLanguage = signal({name: 'EN', code: 'en'});

    public setPreferredLanguage(response: IUser): void {
        response?.preferred_language === 'English' || response?.preferred_language === undefined ? localStorage.setItem('exyl', 'en') : localStorage.setItem('exyl', 'sr');
        this.selectedLanguage.set({name: localStorage.getItem('exyl')!.toLocaleUpperCase(), code: localStorage.getItem('exyl')!});
    }
}