import { inject, Injectable } from "@angular/core";
import { IUser } from "../interfaces/user.interface";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { emailValidator } from "../shared/validators/auth.validators";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private _http = inject(HttpClient);
    public accountSettingsForm: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, emailValidator()]),
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

    public patchAccountSettings(userData: IUser): void {
        this.accountSettingsForm.patchValue({
          name: userData.name,
          email: userData.email,
          preferred_language: userData.preferred_language ?? 'English',
          currency: userData.currency ?? 'Dollar - $'
        })
    }

    public checkChangedInputs(): Partial<IUser> {
        const updatedData: Partial<IUser> = {};
    
        for (const control in this.accountSettingsForm.controls) {
          if (this.accountSettingsForm.controls.hasOwnProperty(control)) {
            const formControl = this.accountSettingsForm.get(control);
    
            if (formControl && formControl.dirty) {
              updatedData[control as keyof IUser] = formControl.value;
            }
          }
        }
    
        return updatedData;
      }
}