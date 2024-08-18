import { Component, inject, Input, input, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Subject, switchMap, takeUntil } from 'rxjs';
import { ExpenseService } from '../../../services/expense.service';
import { NotificationService } from '../../../services/notification.service';
import { IExpense } from '../../../interfaces/expense.interface';
import { IClient } from '../../../interfaces/client.interface';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'exy-search',
  standalone: true,
  imports: [InputGroupModule, InputGroupAddonModule, InputTextModule, TranslateModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit, OnDestroy {
  readonly searchPage = input.required<string>();

  private _expenseService = inject(ExpenseService);
  public _clientService = inject(ClientService);
  public _notificationService = inject(NotificationService);

  private _searchTerm$: Subject<string> = new Subject();
  private _onDestroy$: Subject<void> = new Subject();

  ngOnInit(): void {
    this._observeSearch();
  }

  public searchExpenses(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this._searchTerm$.next(searchTerm);
  }

  private _observeSearch(): void {
    this._searchTerm$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((searchTerm) => 
            this.searchPage() === 'Clients' ? this._clientService.searchClients(searchTerm) : this._expenseService.searchExpenses(searchTerm)
        ),
        takeUntil(this._onDestroy$)
      )
      .subscribe({
        next: (response: IExpense[] | IClient[]) => {
          this.searchPage() === 'Clients' ? this._clientService.clients.set(response as IClient[]) : this._expenseService.expenses.set(response as IExpense[]);
        },
        error: () => {
          this._notificationService.showSnackbar('Error', 'Oops something went wrong while searching!');
        }
      });
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }


}
