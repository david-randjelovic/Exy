import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
    {path: 'auth/register', component: RegisterComponent},
    {path: 'auth/login', component: LoginComponent},
    {path: '', redirectTo: 'auth/register', pathMatch: 'full'},
    {path: '**', redirectTo: 'auth/register', pathMatch: 'full'}
];
