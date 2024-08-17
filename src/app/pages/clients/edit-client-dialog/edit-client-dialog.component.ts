import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { IClient } from '../../../interfaces/client.interface';
import { ClientService } from '../../../services/client.service';
import { NotificationService } from '../../../services/notification.service';
import { DashboardService } from '../../../services/dashboard.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { NumbersOnlyDirective } from '../../../shared/directives/numbers-only.directive';
import { TranslateModule } from '@ngx-translate/core';
import { ChartService } from '../../../services/chart.service';

@Component({
  selector: 'exy-edit-client-dialog',
  standalone: true,
  imports: [CalendarModule, ReactiveFormsModule, InputTextModule, DropdownModule, InputGroupModule, InputGroupAddonModule, NumbersOnlyDirective, TranslateModule],
  templateUrl: './edit-client-dialog.component.html',
  styleUrl: './edit-client-dialog.component.css'
})
export class EditClientDialogComponent implements OnInit {
  public dialogConfig = inject(DynamicDialogConfig);
  private _clientService = inject(ClientService);
  private _notificationService = inject(NotificationService);
  private _dashboardService = inject(DashboardService);
  private _chartService = inject(ChartService);

  public statusOptions = signal<{label: string, value: string}[]>([{label: 'STATUS.ACTIVE', value: 'Active'} , {label: 'STATUS.ARCHIVED', value: 'Archived'}]);

  public editClientForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    company: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    yearly_maintenance: new FormControl('', [Validators.required]),
    payment_date: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  })


  ngOnInit(): void {
    this._populateForm(this.dialogConfig.data);
  }

  public onSubmit(): void {
    this._clientService.editClient(this.editClientForm, this.dialogConfig.data.id).subscribe({
      next: response => {
        this._notificationService.showSnackbar('Success', 'Client added successfully!');
        this._dashboardService.dashboardData.set(response.dashboard_data!);
        this._onEditClient(response.client);
        this._chartService.getChartData(response.dashboard_data);
        this.editClientForm.reset();
        this._clientService.closeDialog.emit();
      },
      error: error => {
        this._notificationService.showSnackbar('Error', 'Oops something went wrong!');
      }
    });
  }

  private _onEditClient(client: IClient): void {
    const clients = [...this._clientService.clients()];
    let clientIndex = clients.findIndex((targetedClient) => targetedClient.id === client.id);
    if(clientIndex !== -1) {
      clients[clientIndex] = client;
    }
    this._clientService.clients.set(clients);
  }

  private _populateForm(clientData: IClient): void {
    this.editClientForm.patchValue({
      name: clientData.name,
      company: clientData.company,
      price: clientData.price,
      yearly_maintenance: clientData.yearly_maintenance,
      payment_date: new Date(clientData.payment_date),
      status: clientData.status
    });
  }

  public close() {
    this._clientService.closeDialog.emit();
  }
}
