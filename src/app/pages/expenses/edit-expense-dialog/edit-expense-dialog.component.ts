import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ExpenseService } from '../../../services/expense.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { NotificationService } from '../../../services/notification.service';
import { ChartService } from '../../../services/chart.service';
import { DashboardService } from '../../../services/dashboard.service';
import { IExpense } from '../../../interfaces/expense.interface';

@Component({
  selector: 'app-edit-expense-dialog',
  standalone: true,
  imports: [InputTextModule, DropdownModule, InputGroupModule, InputGroupAddonModule, TranslateModule, CalendarModule, ReactiveFormsModule, DialogModule],
  templateUrl: './edit-expense-dialog.component.html',
  styleUrl: './edit-expense-dialog.component.css'
})
export class EditExpenseDialogComponent implements OnInit {
  private _dialogConfig = inject(DynamicDialogConfig);
  private _expenseService = inject(ExpenseService);
  private _notificationService = inject(NotificationService);
  private _dashboardService = inject(DashboardService);
  private _chartService = inject(ChartService);

  public statusOptions = signal<{label: string, value: string}[]>([{label: 'STATUS.ACTIVE', value: 'Active'} , {label: 'STATUS.ARCHIVED', value: 'Archived'}]);
  public typeOptions = signal<{label: string, value: string}[]>([{label: 'SUBSCRIPTION.ONE_TIME', value: 'One time'} , {label: 'SUBSCRIPTION.SUBSCRIPTION', value: 'Subscription'}]);

  public editExpenseForm: FormGroup = new FormGroup({
    type: new FormControl('', [Validators.required]),
    company: new FormControl('', [Validators.required]),
    cost: new FormControl('', [Validators.required]),
    payment_date: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  })

  ngOnInit(): void {
    this._populateForm(this._dialogConfig.data);
  }

  public onSubmit(): void {
    this._expenseService.editExpense(this.editExpenseForm, this._dialogConfig.data.id).subscribe({
      next: response => {
        this._notificationService.showSnackbar('Success', 'Expense edited successfully!');
        this._dashboardService.dashboardData.set(response.dashboard_data!);
        this._onEditClient(response.expense);
        this._chartService.getChartData(response.dashboard_data);
        this.editExpenseForm.reset();
        this._expenseService.closeDialog.emit();
      },
      error: error => {
        this._notificationService.showSnackbar('Error', 'Oops something went wrong!');
      }
    });
  }

  private _populateForm(expenseData: IExpense): void {
    this.editExpenseForm.patchValue({
      type: expenseData.type,
      company: expenseData.company,
      cost: expenseData.cost,
      payment_date: new Date(expenseData.payment_date),
      status: expenseData.status
    });
  }

  private _onEditClient(expense: IExpense): void {
    const expenses = [...this._expenseService.expenses()];
    const expenseIndex = expenses.findIndex((targetedExpense) => targetedExpense.id === expense.id);
    if(expenseIndex !== -1) {
      expenses[expenseIndex] = expense;
    }
    this._expenseService.expenses.set(expenses);
  }

  public close() {
    this._expenseService.closeDialog.emit();
  }
}
