import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { DashboardData } from "../models/dashboard-data.model";

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    public dashboardData = signal<DashboardData | null>(null);
    private _http = inject(HttpClient);

    public getDashboardData(): Observable<DashboardData> {
        return this._http.get<DashboardData>(environment.apiUrl + 'dashboard-data');
    }
}