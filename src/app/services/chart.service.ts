import { Injectable } from "@angular/core";
import { DashboardData } from "../models/dashboard-data.model";

@Injectable({
    providedIn: 'root'
})
export class ChartService {
    public chartData: any;
    public chartOptions: any;
    private _months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    public getChartData(data: DashboardData): void {
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
      
          data.incomes.forEach((item: any) => {
            incomeData[item.month - 1] = item.total_income;
          });
      
          data.expenses.forEach((item: any) => {
            expenseData[item.month - 1] = item.total_expense;
          });
      
          this.chartData = {
            labels: this._months,
            datasets: [
              {
                label: 'Income',
                data: incomeData,
                fill: false,
                borderColor: '#42A5F5',
                tension: 0.1
              },
              {
                label: 'Expenses',
                data: expenseData,
                fill: false,
                borderColor: '#FF6384',
                tension: 0.1
              }
            ]
          };
      }
}