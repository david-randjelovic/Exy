import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private currencySymbolSubject = new BehaviorSubject<string>('$');

  public getCurrencySymbol(): string {
    return this.currencySymbolSubject.value;
  }

  public setCurrencySymbol(response: IUser): void {
    this.currencySymbolSubject.next(response.currency.slice(-1));
  }
}