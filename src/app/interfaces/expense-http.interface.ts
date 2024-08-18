import { DashboardData } from "../models/dashboard-data.model"
import { IExpense } from "./expense.interface"

export interface IExpenseHTTP {
    dashboard_data: DashboardData,
    expense: IExpense
} 