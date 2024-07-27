import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function equalPasswords(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if(password === confirmPassword) {
        return null;
    }

    return {passwordsNotEqual: true};
}

export function emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const email = control.value;
      if (!email) {
        return null;
      }
  
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const valid = emailPattern.test(email);
  
      return valid ? null : { invalidEmail: true };
    };
  }