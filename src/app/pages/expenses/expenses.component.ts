import { DatePipe, NgClass } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { IExpense } from '../../interfaces/expense.interface';
import { ExpenseService } from '../../services/expense.service';
import { NotificationService } from '../../services/notification.service';
import { AddClientDialogComponent } from '../clients/add-client-dialog/add-client-dialog.component';
import { AddExpenseDialogComponent } from "./add-expense-dialog/add-expense-dialog.component";
import { DynamicCurrencyPipe } from '../../shared/pipes/currency.pipe';
import { TruncatePipe } from '../../shared/pipes/truncate.pipe';
import { IClient } from '../../interfaces/client.interface';
import { ConfirmationService } from 'primeng/api';
import { DashboardService } from '../../services/dashboard.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [TableModule, NgClass, AddClientDialogComponent, ButtonModule, AddExpenseDialogComponent, DatePipe, DynamicCurrencyPipe, TruncatePipe, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent implements OnInit {
  public visible = signal<boolean>(false);
  public expenseService = inject(ExpenseService);
  private _notificationService = inject(NotificationService);
  private _confirmationService = inject(ConfirmationService);
  private _dashboardService = inject(DashboardService);

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

  public confirmDeletation(event: IClient) {
    console.log('test');
    this._confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",

        accept: () => {
          this._onRemoveExpense(event.id);
        }
    });
  }

  private _onRemoveExpense(id: number): void {
    this.expenseService.onRemoveExpense(id).subscribe({
      next: response => {
        this.expenseService.expenses.update((expenses) => expenses.filter((expense: IExpense) => expense.id !== id));
        this._dashboardService.dashboardData.set(response);
        this._notificationService.showSnackbar('Success', 'Client removed successfully!');
      },
      error: error => {
        this._notificationService.showSnackbar('Error', 'Oops something went wrong!');
      }
    })
  }


}
