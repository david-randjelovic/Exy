import { Component, inject, Signal, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { equalPasswords } from '../validators/auth.validators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MaterialModule, RouterModule],
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
  public registerForm: FormGroup = new FormGroup({
    username: new FormControl('', {validators: [Validators.required, Validators.minLength(2)]}),
    email: new FormControl('', {validators: [Validators.required, Validators.email]}),
    passwords: new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    }, {
      validators: [equalPasswords]
    })
  })
  public passwordHidden = signal<{password: boolean, confirmPassword: boolean}>({
    password: true,
    confirmPassword: true
  });
  public authService = inject(AuthService);

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
