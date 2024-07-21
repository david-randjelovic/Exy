import { AbstractControl } from "@angular/forms";

export function equalPasswords(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if(password === confirmPassword) {
        return null;
    }

    return {passwordsNotEqual: true};
}