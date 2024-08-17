import { Component, inject, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ExpenseService } from '../../../services/expense.service';
import { NotificationService } from '../../../services/notification.service';
import { IExpense } from '../../../interfaces/expense.interface';
import { SpinnerService } from '../../../services/spinner.service';
import { DashboardService } from '../../../services/dashboard.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ChartService } from '../../../services/chart.service';

@Component({
  selector: 'exy-add-expense-dialog',
  standalone: true,
  imports: [CalendarModule, ReactiveFormsModule, DialogModule, InputTextModule, DropdownModule, InputGroupModule, InputGroupAddonModule, TranslateModule],
  templateUrl: './add-expense-dialog.component.html',
  styleUrl: './add-expense-dialog.component.css'
})
export class AddExpenseDialogComponent {
  private _expenseService = inject(ExpenseService);
  private _notificationService = inject(NotificationService);
  private _dashboardService = inject(DashboardService);
  private _chartService = inject(ChartService);
  
  public visible = input.required<boolean>();

  public closeDialog = output<void>();
  public addExpense = output<IExpense>();

  public statusOptions = signal<{label: string, value: string}[]>([{label: 'STATUS.ACTIVE', value: 'Active'} , {label: 'STATUS.ARCHIVED', value: 'Archived'}]);
  public typeOptions = signal<{label: string, value: string}[]>([{label: 'SUBSCRIPTION.ONE_TIME', value: 'One time'} , {label: 'SUBSCRIPTION.SUBSCRIPTION', value: 'Subscription'}]);

  public addExpenseForm: FormGroup = new FormGroup({
    type: new FormControl(''),
    company: new FormControl(''),
    cost: new FormControl(''),
    payment_date: new FormControl(''),
    status: new FormControl(''),
  })

  public onSubmit(): void {
    this._expenseService.addExpense(this.addExpenseForm).subscribe({
      next: response => {
        this._notificationService.showSnackbar('Success', 'Client added successfully!');
        this._dashboardService.dashboardData.set(response.dashboard_data);
        this._chartService.getChartData(response.dashboard_data);
        this.addExpense.emit(response);
        this.addExpenseForm.reset();
        this.close();
      },
      error: error => {
        this._notificationService.showSnackbar('Error', 'Oops something went wrong!');
      }
    });
  }

  public close() {
    this.closeDialog.emit();
  }
}