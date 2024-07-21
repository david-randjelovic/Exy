import { Component, signal } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, FormsModule, RouterModule],
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
    username: new FormControl('', {validators: [Validators.required]}),
    password: new FormControl('', {validators: [Validators.required, Validators.minLength(8)]})
  });
  public isPasswordHidden = signal<boolean>(true);
  
  public onRevealPassword(event: MouseEvent): void {
    this.isPasswordHidden.update((passwordHidden) => !passwordHidden);
    event.stopPropagation();
  }
}
