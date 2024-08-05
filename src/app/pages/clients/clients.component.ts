import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { AddClientDialogComponent } from "./add-client-dialog/add-client-dialog.component";
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { IClient } from '../../interfaces/client.interface';
import { ClientService } from '../../services/client.service';
import { NotificationService } from '../../services/notification.service';
import { SpinnerService } from '../../services/spinner.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [TableModule, NgClass, AddClientDialogComponent, ButtonModule, DatePipe],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit {
  public visible = signal<boolean>(false);
  public clientService = inject(ClientService);
  private _notificationService = inject(NotificationService);

  ngOnInit(): void {
    this._onGetClients();
  }

  public showDialog(): void {
    this.visible.update((oldValue) => !oldValue);
  }

  public onAddClient(client: IClient): void {
    this.clientService.clients.update((clients) => [...clients, client]);
  }

  private _onGetClients(): void {
    if( this.clientService.clients().length > 0) return;
    this.clientService.getClients().subscribe({
      next: response => {
        this.clientService.clients.set(response);
      },
      error: error => {
        this._notificationService.showSnackbar('Error', 'Oops something went wrong!');
      }
    });
  }
}
