import { Component, inject, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ClientService } from '../../../services/client.service';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from '../../../services/spinner.service';
import { NotificationService } from '../../../services/notification.service';
import { IClient } from '../../../interfaces/client.interface';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

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
  public addClient = output<IClient>();

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
  private _spinnerService = inject(SpinnerService);
  private _notificationService = inject(NotificationService);


  public onSubmit(): void {
    this._clientService.addClient(this.addClientForm).subscribe({
      next: response => {
        this._notificationService.showSnackbar('Success', 'Client added successfully!');
        this.addClient.emit(response);
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
