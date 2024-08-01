import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { SpinnerService } from '../../services/spinner.service';
import { emailValidator, equalPasswords } from '../../shared/validators/auth.validators';
import { LanguageDropdownComponent } from "../../shared/components/language-dropdown/language-dropdown.component";
import { TranslateModule } from '@ngx-translate/core';
import { NgClass } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterModule, LanguageDropdownComponent, TranslateModule, InputTextModule, ButtonModule, InputGroupModule, InputGroupAddonModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  animations: [
    trigger('slideInFromLeft', [
      state('void', style({ transform: 'translateX(-20%)', opacity: 0 })),
      transition(':enter', [
        animate('0.8s 0.5s ease', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ]),
    trigger('slideInFromRight', [
      state('void', style({ transform: 'translateX(20%)', opacity: 0 })),
      transition(':enter', [
        animate('0.8s ease', style({ transform: 'translateX(0)', opacity: 1 }))
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
export class RegisterComponent {
  // Forms
  public registerForm: FormGroup = new FormGroup({
    username: new FormControl('', {validators: [Validators.required, Validators.minLength(2)]}),
    email: new FormControl('', {validators: [Validators.required, emailValidator()]}),
    passwords: new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    }, {
      validators: [equalPasswords]
    })
  })
  
  // Objects
  public passwordHidden = signal<{password: boolean, confirmPassword: boolean}>({
    password: true,
    confirmPassword: true
  });

  // Injectables
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _notificationService = inject(NotificationService);
  private _spinnerService = inject(SpinnerService);

  public onSubmit(): void {
    this._authService.onRegister(this.registerForm).subscribe({
      next: response => {
        this.registerForm.reset();
        this._router.navigateByUrl('/auth/login');
        this._notificationService.showSnackbar('Success', 'Registration Succcessful! Please log in.')
      },
      error: error => {
        this._notificationService.showSnackbar('Error', error.error.message);
      }
    });
  }

  public onPasswordVisibilityToggle(event: MouseEvent, field: 'password' | 'confirmPassword'): void {
    this._togglePasswordVisibility(field);
    event.stopPropagation();
  }

  private _togglePasswordVisibility(field: 'password' | 'confirmPassword'): void {
    this.passwordHidden.update(state => {
      state[field] = !state[field];
      return state;
    });
  }
}
