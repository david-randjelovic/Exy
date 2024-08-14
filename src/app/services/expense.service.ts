import { inject, Injectable, signal } from "@angular/core";
import { Observable } from "rxjs";
import { IExpense } from "../interfaces/expense.interface";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { FormGroup } from "@angular/forms";
import { DashboardData } from "../models/dashboard-data.model";

@Injectable({
    providedIn: 'root'
})
export class ExpenseService {
    public expenses = signal<any>([]);
    private _http = inject(HttpClient);

    public getExpenses(): Observable<IExpense[]> {
        return this._http.get<IExpense[]>(environment.apiUrl + 'expenses');
    }

    public addExpense(form: FormGroup): Observable<IExpense> {
        return this._http.post<IExpense>(environment.apiUrl + 'expenses', form.value);
    }

    
    public onRemoveExpense(id: number): Observable<DashboardData> {
        return this._http.delete<DashboardData>(environment.apiUrl + `expenses/${id}`);
    }
}