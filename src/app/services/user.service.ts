import { EventEmitter, inject, Injectable } from "@angular/core";
import { IUser } from "../interfaces/user.interface";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { FormControl, FormGroup } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private _http = inject(HttpClient);
    public userLanguageChanged: EventEmitter<void> = new EventEmitter();
    public accountSettingsForm: FormGroup = new FormGroup({
        name: new FormControl(''),
        email: new FormControl(''),
        preferred_language: new FormControl(''),
        currency: new FormControl(''),
        password: new FormControl('')
    })

    public userData: IUser | null = null;

    public getUserData(): Observable<IUser> {
        return this._http.get<IUser>(environment.apiUrl + 'get-user-data');
    }

    public updateUserData(userData: Partial<IUser>): Observable<IUser> {
        return this._http.patch<IUser>(environment.apiUrl + 'update-user-data', userData);
    }

    public profilePictureCall(formData: FormData): Observable<string> {
        return this._http.post<string>(environment.apiUrl + 'upload-profile-picture', formData);
    }
}