import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { AddClientDialogComponent } from "./add-client-dialog/add-client-dialog.component";
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { IClient } from '../../interfaces/client.interface';
import { ClientService } from '../../services/client.service';
import { NotificationService } from '../../services/notification.service';
import { DashboardService } from '../../services/dashboard.service';
import { EditClientDialogComponent } from "./edit-client-dialog/edit-client-dialog.component";
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [TableModule, NgClass, AddClientDialogComponent, ButtonModule, DatePipe, EditClientDialogComponent, DynamicDialogModule],
  providers: [DialogService, DynamicDialogRef],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit, OnDestroy {
  public clientService = inject(ClientService);
  private _notificationService = inject(NotificationService);
  private _dashboardService = inject(DashboardService);
  private _dialogService = inject(DialogService);
  private _dialogRef = inject(DynamicDialogRef);

  public addDialogVisible = signal<boolean>(false);
  public editDialogVisible = signal<boolean>(false);
  public selectedClientForEditing = signal<IClient | null>(null);
  public onDestroy$: Subject<void> = new Subject();

  ngOnInit(): void {
    this._onGetClients();
    this._observeDialogClosing();
  }

  public showAddDialog(): void {
    this.addDialogVisible.update((oldValue) => !oldValue);
  }

  public showEditDialog(client: IClient): void {
    this.selectedClientForEditing.set(client);
    this._dialogRef = this._dialogService.open(EditClientDialogComponent, {
      header: 'Edit Client',
      data: client
    })
  }

  public closeEditDialog(): void {
    this.editDialogVisible.set(false);
  }

  public onRemoveClient(id: number): void {
    this.clientService.onRemoveClient(id).subscribe({
      next: response => {
        this.clientService.clients.update((clients) => clients.filter((client) => client.id !== id));
        this._dashboardService.dashboardData.set(response);
        this._notificationService.showSnackbar('Success', 'Client removed successfully!');
      },
      error: error => {
        this._notificationService.showSnackbar('Error', 'Oops something went wrong!');
      }
    })
  }

  private _observeDialogClosing(): void {
    this.clientService.closeDialog.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      this._dialogRef.close();
    })
  }

  private _onGetClients(): void {
    if(this.clientService.clients().length > 0) return;
    this.clientService.getClients().subscribe({
      next: response => {
        this.clientService.clients.set(response);
      },
      error: error => {
        this._notificationService.showSnackbar('Error', 'Oops something went wrong!');
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
