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
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ChartService } from '../../services/chart.service';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditExpenseDialogComponent } from './edit-expense-dialog/edit-expense-dialog.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [TableModule, NgClass, AddClientDialogComponent, ButtonModule, AddExpenseDialogComponent, DatePipe, DynamicCurrencyPipe, TruncatePipe, ConfirmDialogModule, TranslateModule],
  providers: [ConfirmationService, DynamicDialogRef, DialogService],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent implements OnInit {
  public expenseService = inject(ExpenseService);
  public translate = inject(TranslateService);
  private _dialogRef = inject(DynamicDialogRef);
  private _dialogService = inject(DialogService);
  private _notificationService = inject(NotificationService);
  private _confirmationService = inject(ConfirmationService);
  private _dashboardService = inject(DashboardService);
  private _chartService = inject(ChartService);

  public visible = signal<boolean>(false);
  public onDestroy$: Subject<void> = new Subject();

  ngOnInit(): void {
    this._onGetClients();
    this._observeDialogClosing(); 
  }

  public showDialog(): void {
    this.visible.update((oldValue) => !oldValue);
  }

  public onAddExpense(expense: IExpense): void {
    this.expenseService.expenses.update((expenses) => [...expenses, expense]);
  }

  private _onGetClients(): void {
    if(this.expenseService.expenses().length > 0 || !this.expenseService.expensesExist()) return;
    this.expenseService.getExpenses().subscribe({
      next: response => {
        response.length > 0 ? this.expenseService.expenses.set(response) : this.expenseService.expensesExist.set(false);
      },
      error: error => {
        this._notificationService.showSnackbar('Error', 'Oops something went wrong!');
      }
    });
  }

  public showEditDialog(expense: IExpense): void {
    this._dialogRef = this._dialogService.open(EditExpenseDialogComponent, {
      header: 'Edit Expense',
      data: expense
    })
  }

  public confirmDeletation(event: IClient) {
    this._confirmationService.confirm({
        message: this.translate.instant('DELETE_CONFIMATION.DELETE_RECORD'),
        header: this.translate.instant('DELETE_CONFIMATION.DELETE_CONFIRMATION'),
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptLabel: this.translate.instant('ACTIONS.YES'),
        rejectLabel: this.translate.instant('ACTIONS.NO'),
        acceptIcon:"none",
        rejectIcon:"none",

        accept: () => {
          this._onRemoveExpense(event.id);
        }
    });
  }

  private _observeDialogClosing(): void {
    this.expenseService.closeDialog.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      this._dialogRef.close();
    })
  }

  private _onRemoveExpense(id: number): void {
    this.expenseService.onRemoveExpense(id).subscribe({
      next: response => {
        this.expenseService.expenses.update((expenses) => expenses.filter((expense: IExpense) => expense.id !== id));
        this._dashboardService.dashboardData.set(response);
        this._chartService.getChartData(response);
        this._notificationService.showSnackbar('Success', 'Client removed successfully!');
      },
      error: error => {
        this._notificationService.showSnackbar('Error', 'Oops something went wrong!');
      }
    })
  }
}
