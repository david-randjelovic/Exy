import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { FormGroup } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private _http: HttpClient) {}

    public onRegister(form: FormGroup): Observable<string> {
        return this._http.post<string>(environment.apiUrl + 'register', form.value);
    }
    public onLogin(form: FormGroup): Observable<any> {
        return this._http.post(environment.apiUrl + 'login', form.value);
    }
}