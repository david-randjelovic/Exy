import { HttpClient } from "@angular/common/http";
import { EventEmitter, inject, Injectable, signal } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { FormGroup } from "@angular/forms";
import { IClient } from "../interfaces/client.interface";
import { DashboardData } from "../models/dashboard-data.model";
import { IClientHTTP } from "../interfaces/client-http.interface";

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    public clients = signal<IClient[]>([]);
    public clientsExist = signal<boolean>(true);
    public closeDialog: EventEmitter<void> = new EventEmitter();

    private _http = inject(HttpClient);

    public getClients(): Observable<IClient[]> {
        return this._http.get<IClient[]>(environment.apiUrl + 'clients');
    }

    public addClient(form: FormGroup): Observable<IClientHTTP> {
        return this._http.post<IClientHTTP>(environment.apiUrl + 'clients', form.value);
    }

    public editClient(form: FormGroup, id: number): Observable<IClientHTTP> {
        return this._http.put<IClientHTTP>(environment.apiUrl + `clients/${id}`, form.value);
    }

    public onRemoveClient(id: number): Observable<DashboardData> {
        return this._http.delete<DashboardData>(environment.apiUrl + `clients/${id}`);
    }
    
    public searchClients(searchTerm: string): Observable<IClient[]> {
        return this._http.get<IClient[]>(environment.apiUrl + `clients/search?search=${searchTerm}`);
    }
}