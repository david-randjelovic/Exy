import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    {path: 'auth/register', component: RegisterComponent},
    {path: 'auth/login', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
    {path: '', redirectTo: 'auth/register', pathMatch: 'full'},
    {path: '**', redirectTo: 'auth/register', pathMatch: 'full'}
];
