import { DatePipe, NgClass } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { IExpense } from '../../interfaces/expense.interface';
import { ExpenseService } from '../../services/expense.service';
import { NotificationService } from '../../services/notification.service';
import { AddClientDialogComponent } from '../clients/add-client-dialog/add-client-dialog.component';
import { AddExpenseDialogComponent } from "./add-expense-dialog/add-expense-dialog.component";

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [TableModule, NgClass, AddClientDialogComponent, ButtonModule, AddExpenseDialogComponent, DatePipe],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent implements OnInit {
  public visible = signal<boolean>(false);
  public expenseService = inject(ExpenseService);
  private _notificationService = inject(NotificationService);

  ngOnInit(): void {
    this._onGetClients(); 
  }

  public showDialog(): void {
    this.visible.update((oldValue) => !oldValue);
  }

  public onAddExpense(expense: IExpense): void {
    this.expenseService.expenses.update((expenses) => [...expenses, expense]);
  }

  private _onGetClients(): void {
    if(this.expenseService.expenses().length > 0) return;
    this.expenseService.getExpenses().subscribe({
      next: response => {
        this.expenseService.expenses.set(response);
      },
      error: error => {
        this._notificationService.showSnackbar('Error', 'Oops something went wrong!');
      }
    });
  }

}
