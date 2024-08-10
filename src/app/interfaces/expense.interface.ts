import { DashboardData } from "../models/dashboard-data.model"

export interface IExpense {
    id: number,
    type: string,
    company: string,
    cost: number,
    payment_date: string,
    status: string,
    created_at: string,
    updated_at: string
    dashboard_data: DashboardData
} 