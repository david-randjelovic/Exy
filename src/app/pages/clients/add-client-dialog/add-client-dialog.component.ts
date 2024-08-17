import { Component, inject, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ChartService } from '../../../services/chart.service';
import { ClientService } from '../../../services/client.service';
import { DashboardService } from '../../../services/dashboard.service';
import { NotificationService } from '../../../services/notification.service';
import { NumbersOnlyDirective } from '../../../shared/directives/numbers-only.directive';

@Component({
  selector: 'exy-add-client-dialog',
  standalone: true,
  imports: [CalendarModule, ReactiveFormsModule, DialogModule, InputTextModule, DropdownModule, InputGroupModule, InputGroupAddonModule, NumbersOnlyDirective, TranslateModule],
  templateUrl: './add-client-dialog.component.html',
  styleUrl: './add-client-dialog.component.css'
})
export class AddClientDialogComponent {
  private _clientService = inject(ClientService);
  private _notificationService = inject(NotificationService);
  private _dashboardService = inject(DashboardService);
  private _chartService = inject(ChartService);


  public visible = input.required<boolean>();

  public closeDialog = output<void>();

  public statusOptions = signal<{label: string, value: string}[]>([{label: 'STATUS.ACTIVE', value: 'Active'} , {label: 'STATUS.ARCHIVED', value: 'Archived'}]);

  public addClientForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    company: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    yearly_maintenance: new FormControl('', [Validators.required]),
    payment_date: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  })



  public onSubmit(): void {
    this._clientService.addClient(this.addClientForm).subscribe({
      next: response => {
          this._notificationService.showSnackbar('Success', 'Client added successfully!');
          this._dashboardService.dashboardData.set(response.dashboard_data!);
          this._chartService.getChartData(response.dashboard_data);
          this._clientService.clients.update((clients) => [...clients, response.client]);
          this.addClientForm.reset();
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
