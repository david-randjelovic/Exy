import { DashboardData } from "../models/dashboard-data.model"

export interface IClient {
    id: number,
    name: string,
    company: string,
    price: number,
    yearly_maintenance: number,
    payment_date: string,
    status: string,
    created_at: string,
    updated_at: string
    dashboard_data?: DashboardData
} 