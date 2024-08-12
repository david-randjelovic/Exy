import { inject, Pipe, PipeTransform } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';

@Pipe({
  name: 'dynamicCurrency',
  standalone: true
})
export class DynamicCurrencyPipe implements PipeTransform {

    private _currencyService = inject(CurrencyService);

    transform(value: number): string {
        const currencySymbol = this._currencyService.getCurrencySymbol();
        return `${currencySymbol} ${value.toFixed(2)}`;
    }
}