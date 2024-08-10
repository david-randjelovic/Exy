import { DashboardData } from "../models/dashboard-data.model"
import { IClient } from "./client.interface"

export interface IClientHTTP {
    dashboard_data: DashboardData,
    client: IClient
} 