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

@Component({
  selector: 'exy-add-expense-dialog',
  standalone: true,
  imports: [CalendarModule, ReactiveFormsModule, DialogModule, InputTextModule, DropdownModule, InputGroupModule, InputGroupAddonModule],
  templateUrl: './add-expense-dialog.component.html',
  styleUrl: './add-expense-dialog.component.css'
})
export class AddExpenseDialogComponent {
  public visible = input.required<boolean>();

  public closeDialog = output<void>();
  public addExpense = output<IExpense>();

  public statusOptions = signal<string[]>(['Active', 'Archived']);
  public typeOptions = signal<string[]>(['One time', 'Subscription']);

  public addExpenseForm: FormGroup = new FormGroup({
    type: new FormControl(''),
    company: new FormControl(''),
    cost: new FormControl(''),
    payment_date: new FormControl(''),
    status: new FormControl(''),
  })

  private _expenseService = inject(ExpenseService);
  private _notificationService = inject(NotificationService);


  public onSubmit(): void {
    this._expenseService.addExpense(this.addExpenseForm).subscribe({
      next: response => {
        this._notificationService.showSnackbar('Success', 'Client added successfully!');
        this.addExpense.emit(response);
        this.addExpenseForm.reset();
        this.close();
      },
      error: error => {
        console.log(error);
        this._notificationService.showSnackbar('Error', 'Oops something went wrong!');
      }
    });
  }

  public close() {
    this.closeDialog.emit();
  }
}