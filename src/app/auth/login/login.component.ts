import { Component, inject, signal } from '@angular/core';
import { PrimeNgModule } from '../../primeng.module';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { emailValidator } from '../../shared/validators/auth.validators';
import { SpinnerService } from '../../services/spinner.service';
import { finalize } from 'rxjs';
import { LanguageDropdownComponent } from "../../shared/components/language-dropdown/language-dropdown.component";
import { TranslateModule } from '@ngx-translate/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PrimeNgModule, ReactiveFormsModule, FormsModule, RouterModule, LanguageDropdownComponent, TranslateModule, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [
    trigger('slideInFromLeft', [
      state('void', style({ transform: 'translateX(-20%)', opacity: 0 })),
      transition(':enter', [
        animate('0.8s ease', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ]),
    trigger('slideInFromRight', [
      state('void', style({ transform: 'translateX(20%)', opacity: 0 })),
      transition(':enter', [
        animate('0.8s 0.5s ease', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ]),
    trigger('slideInFromTop', [
      state('void', style({ transform: 'translateY(-20%)', opacity: 0 })),
      transition(':enter', [
        animate('1s 0.8s ease', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
  ]
})
export class LoginComponent {
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', {validators: [Validators.required, emailValidator()]}),
    password: new FormControl('', {validators: [Validators.required, Validators.minLength(8)]})
  });
  public isPasswordHidden = signal<boolean>(true);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _notificationService = inject(NotificationService);
  private _spinnerService = inject(SpinnerService);

  public onSubmit(): void {
    this._spinnerService.toggleSpinner();
    this._authService.onLogin(this.loginForm).pipe(finalize(() => this._spinnerService.toggleSpinner())).subscribe({
      next: response => {
        localStorage.setItem('exyt', response.token);
        this._router.navigateByUrl('dashboard');
        this._notificationService.showSnackbar('Success', 'Login Successful!');
      },
      error: error => {
        this._notificationService.showSnackbar('Error', 'Either email or password is incorrect.');
      }
    })
  }
  
  public onRevealPassword(event: MouseEvent): void {
    this.isPasswordHidden.update((passwordHidden) => !passwordHidden);
    event.stopPropagation();
  }
}
