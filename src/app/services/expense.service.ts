import { EventEmitter, inject, Injectable, Signal, signal } from "@angular/core";
import { debounceTime, distinctUntilChanged, Observable } from "rxjs";
import { IExpense } from "../interfaces/expense.interface";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { FormGroup } from "@angular/forms";
import { DashboardData } from "../models/dashboard-data.model";
import { IExpenseHTTP } from "../interfaces/expense-http.interface";

@Injectable({
    providedIn: 'root'
})
export class ExpenseService {
    private _http = inject(HttpClient);

    public expenses = signal<any>([]);
    public expensesExist = signal<boolean>(true);
    public closeDialog: EventEmitter<void> = new EventEmitter();

    public getExpenses(): Observable<IExpense[]> {
        return this._http.get<IExpense[]>(environment.apiUrl + 'expenses');
    }

    public addExpense(form: FormGroup): Observable<IExpense> {
        return this._http.post<IExpense>(environment.apiUrl + 'expenses', form.value);
    }

    public editExpense(form: FormGroup, id: number): Observable<IExpenseHTTP> {
        return this._http.put<IExpenseHTTP>(environment.apiUrl + `expenses/${id}`, form.value);
    }
    
    public onRemoveExpense(id: number): Observable<DashboardData> {
        return this._http.delete<DashboardData>(environment.apiUrl + `expenses/${id}`);
    }

    public searchExpenses(searchTerm: string): Observable<IExpense[]> {
        return this._http.get<IExpense[]>(environment.apiUrl + `expenses/search?search=${searchTerm}`);
    }
}