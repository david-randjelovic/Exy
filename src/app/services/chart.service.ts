import { Injectable } from "@angular/core";
import { DashboardData } from "../models/dashboard-data.model";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";
import { tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  public chartData: any;
  public chartOptions: any;
  private _months: string[] = [];
  private _originalData: DashboardData | null = null;

  constructor(private _translate: TranslateService) {
    this._loadTranslationsAndUpdateChart();

    this._translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this._loadTranslationsAndUpdateChart();
    });
  }

  public getChartData(data: DashboardData): void {
    if (!data) {
      return;
    }

    this._originalData = data;

    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: '#ebedef'
          },
          ticks: {
            color: '#495057'
          }
        },
        y: {
          grid: {
            color: '#ebedef'
          },
          ticks: {
            color: '#495057'
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false,
    };

    const incomeData = Array(12).fill(0);
    const expenseData = Array(12).fill(0);

    if (data.incomes && Array.isArray(data.incomes)) {
      data.incomes.forEach((item: any) => {
        if (item.month && item.total_income !== undefined) {
          incomeData[item.month - 1] = item.total_income;
        }
      });
    }

    if (data.expenses && Array.isArray(data.expenses)) {
      data.expenses.forEach((item: any) => {
        if (item.month && item.total_expense !== undefined) {
          expenseData[item.month - 1] = item.total_expense;
        }
      });
    }

    this.chartData = {
      labels: this._months,
      datasets: [
        {
          label: this._translate.instant('EXPENSES.INCOME'),
          data: incomeData,
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.1
        },
        {
          label: this._translate.instant('EXPENSES.EXPENSES'),
          data: expenseData,
          fill: false,
          borderColor: '#FF6384',
          tension: 0.1
        }
      ]
    };
  }

  private _loadTranslationsAndUpdateChart(): void {
    this._loadTranslations().subscribe(() => {
      if (this._originalData) {
        this.getChartData(this._originalData);
      }
    });
  }

  private _loadTranslations() {
    return this._translate.get([
      'MONTHS.JANUARY',
      'MONTHS.FEBRUARY',
      'MONTHS.MARCH',
      'MONTHS.APRIL',
      'MONTHS.MAY',
      'MONTHS.JUNE',
      'MONTHS.JULY',
      'MONTHS.AUGUST',
      'MONTHS.SEPTEMBER',
      'MONTHS.OCTOBER',
      'MONTHS.NOVEMBER',
      'MONTHS.DECEMBER'
    ]).pipe(
      tap(translations => {
        this._months = [
          translations['MONTHS.JANUARY'],
          translations['MONTHS.FEBRUARY'],
          translations['MONTHS.MARCH'],
          translations['MONTHS.APRIL'],
          translations['MONTHS.MAY'],
          translations['MONTHS.JUNE'],
          translations['MONTHS.JULY'],
          translations['MONTHS.AUGUST'],
          translations['MONTHS.SEPTEMBER'],
          translations['MONTHS.OCTOBER'],
          translations['MONTHS.NOVEMBER'],
          translations['MONTHS.DECEMBER']
        ];
      })
    );
  }
}
