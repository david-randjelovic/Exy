import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private currencySymbolSubject = new BehaviorSubject<string>('$');

  setCurrencySymbol(symbol: string) {
    this.currencySymbolSubject.next(symbol);
  }

  getCurrencySymbol(): string {
    return this.currencySymbolSubject.value;
  }
}