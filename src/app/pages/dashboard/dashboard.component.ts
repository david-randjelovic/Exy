import { Component, inject, OnInit } from '@angular/core';
import { ExyCardComponent } from "../../shared/components/exy-card/exy-card.component";
import { DashboardService } from '../../services/dashboard.service';
import { NotificationService } from '../../services/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ExyCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  public dashboardService = inject(DashboardService);
  private _notificationService = inject(NotificationService);
  public translate = inject(TranslateService);

  ngOnInit(): void {
    this._getDashboardData();
  }

  private _getDashboardData(): void {
    if(this.dashboardService.dashboardData()) return;
    this.dashboardService.getDashboardData().subscribe({
      next: response => {
        this.dashboardService.dashboardData.set(response);
      },
      error: error => {
        this._notificationService.showSnackbar('Error', 'Oops something went wrong!');
      }
    })
  }
}
