import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _http = inject(HttpClient); 
    private _router = inject(Router); 

    public onRegister(form: FormGroup): Observable<string> {
        return this._http.post<string>(environment.apiUrl + 'register', form.value);
    }
    public onLogin(form: FormGroup): Observable<any> {
        return this._http.post(environment.apiUrl + 'login', form.value);
    }
    public onLogOut(): void {
        localStorage.removeItem('exyt');
        this._router.navigateByUrl('/auth/login');
    }
}