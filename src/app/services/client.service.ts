import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { FormGroup } from "@angular/forms";
import { IClient } from "../interfaces/client.interface";

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    public clients = signal<IClient[]>([]);

    private _http = inject(HttpClient);

    public getClients(): Observable<IClient[]> {
        return this._http.get<IClient[]>(environment.apiUrl + 'clients');
    }

    public addClient(clientForm: FormGroup): Observable<IClient> {
        return this._http.post<IClient>(environment.apiUrl + 'clients', clientForm.value);
    }
}