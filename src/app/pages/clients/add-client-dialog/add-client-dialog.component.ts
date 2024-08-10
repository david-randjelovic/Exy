import { Component, inject, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { IClient } from '../../../interfaces/client.interface';
import { ClientService } from '../../../services/client.service';
import { NotificationService } from '../../../services/notification.service';
import { DashboardService } from '../../../services/dashboard.service';
import { DashboardData } from '../../../models/dashboard-data.model';

@Component({
  selector: 'exy-add-client-dialog',
  standalone: true,
  imports: [CalendarModule, ReactiveFormsModule, DialogModule, InputTextModule, DropdownModule, InputGroupModule, InputGroupAddonModule],
  templateUrl: './add-client-dialog.component.html',
  styleUrl: './add-client-dialog.component.css'
})
export class AddClientDialogComponent {
  public visible = input.required<boolean>();

  public closeDialog = output<void>();

  public options = signal<string[]>(['Active', 'Archived']);

  public addClientForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    company: new FormControl(''),
    price: new FormControl(''),
    yearly_maintenance: new FormControl(''),
    payment_date: new FormControl(''),
    status: new FormControl(''),
  })

  private _clientService = inject(ClientService);
  private _notificationService = inject(NotificationService);
  private _dashboardService = inject(DashboardService);


  public onSubmit(): void {
    this._clientService.addClient(this.addClientForm).subscribe({
      next: response => {
          this._notificationService.showSnackbar('Success', 'Client added successfully!');
          this._dashboardService.dashboardData.set(response.dashboard_data!);
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
