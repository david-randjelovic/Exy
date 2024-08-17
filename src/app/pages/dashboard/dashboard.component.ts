import { Component, inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ChartService } from '../../services/chart.service';
import { DashboardService } from '../../services/dashboard.service';
import { NotificationService } from '../../services/notification.service';
import { ExyCardComponent } from "../../shared/components/exy-card/exy-card.component";
import { ChartComponent } from "./chart/chart.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ExyCardComponent, ChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  public dashboardService = inject(DashboardService);
  public translate = inject(TranslateService);
  private _notificationService = inject(NotificationService);
  private _chartService = inject(ChartService);

  ngOnInit(): void {
    this._getDashboardData();
  }

  private _getDashboardData(): void {
    if(this.dashboardService.dashboardData()) return;
    this.dashboardService.getDashboardData().subscribe({
      next: response => {
        this._chartService.getChartData(response);
        this.dashboardService.dashboardData.set(response);
      },
      error: error => {
        this._notificationService.showSnackbar('Error', 'Oops something went wrong!');
      }
    })
  }


}
