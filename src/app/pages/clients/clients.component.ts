import { DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { IClient } from '../../interfaces/client.interface';
import { ChartService } from '../../services/chart.service';
import { ClientService } from '../../services/client.service';
import { DashboardService } from '../../services/dashboard.service';
import { NotificationService } from '../../services/notification.service';
import { DynamicCurrencyPipe } from '../../shared/pipes/currency.pipe';
import { TruncatePipe } from '../../shared/pipes/truncate.pipe';
import { AddClientDialogComponent } from "./add-client-dialog/add-client-dialog.component";
import { EditClientDialogComponent } from "./edit-client-dialog/edit-client-dialog.component";
import { SearchComponent } from "../../shared/components/search/search.component";

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [TableModule, NgClass, AddClientDialogComponent, ButtonModule, DatePipe, EditClientDialogComponent, DynamicDialogModule, ConfirmDialogModule, DynamicCurrencyPipe, TruncatePipe, DecimalPipe, TranslateModule, InputGroupModule, InputGroupAddonModule, InputTextModule, SearchComponent],
  providers: [DialogService, DynamicDialogRef, ConfirmationService],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit, OnDestroy {
  public clientService = inject(ClientService);
  public translate = inject(TranslateService);
  private _notificationService = inject(NotificationService);
  private _dashboardService = inject(DashboardService);
  private _dialogService = inject(DialogService);
  private _dialogRef = inject(DynamicDialogRef);
  private _confirmationService = inject(ConfirmationService);
  private _chartService = inject(ChartService);

  public addDialogVisible = signal<boolean>(false);
  public editDialogVisible = signal<boolean>(false);

  public onDestroy$: Subject<void> = new Subject();

  ngOnInit(): void {
    this._onGetClients();
    this._observeDialogClosing();
  }

  public showAddDialog(): void {
    this.addDialogVisible.update((oldValue) => !oldValue);
  }

  public showEditDialog(client: IClient): void {
    this._dialogRef = this._dialogService.open(EditClientDialogComponent, {
      header: this.translate.instant("CLIENTS.EDIT_CLIENT"),
      data: client
    })
  }

  public confirmDeletation(event: IClient) {
    this._confirmationService.confirm({
        message: this.translate.instant('DELETE_CONFIRMATION.DELETE_RECORD'),
        header: this.translate.instant('DELETE_CONFIRMATION.DELETE_CONFIRMATION'),
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptLabel: this.translate.instant('ACTIONS.YES'),
        rejectLabel: this.translate.instant('ACTIONS.NO'),
        acceptIcon:"none",
        rejectIcon:"none",

        accept: () => {
          this._onRemoveClient(event.id);
        }
    });
  }

  private _onRemoveClient(id: number): void {
    this.clientService.onRemoveClient(id).subscribe({
      next: response => {
        this.clientService.clients.update((clients) => clients.filter((client) => client.id !== id));
        this._dashboardService.dashboardData.set(response);
        this._chartService.getChartData(response);
        this._notificationService.showSnackbar('Success', 'Client removed successfully!');
      },
      error: error => {
        this._notificationService.showSnackbar('Error', 'Oops something went wrong!');
      }
    })
  }

  private _onGetClients(): void {
    if(this.clientService.clients().length > 0 || !this.clientService.clientsExist()) return;
    this.clientService.getClients().subscribe({
      next: response => {
        response.length > 0 ? this.clientService.clients.set(response) : this.clientService.clientsExist.set(false);
      },
      error: error => {
        this._notificationService.showSnackbar('Error', 'Oops something went wrong!');
      }
    });
  }

  private _observeDialogClosing(): void {
    this.clientService.closeDialog.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      this._dialogRef.close();
    })
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
