import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { IUser } from './interfaces/user.interface';
import { NotificationService } from './services/notification.service';
import { UserService } from './services/user.service';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { SpinnerComponent } from "./shared/components/spinner.component";
import { CurrencyService } from './services/currency.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule, SpinnerComponent, HeaderComponent, SidebarComponent, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public router = inject(Router);
  private _userService = inject(UserService);
  private _notificationService = inject(NotificationService);
  private _currencyService = inject(CurrencyService);

  ngOnInit(): void {
    this._userService.getUserData().subscribe({
      next: response => {
        this._userService.userData = response;
        this._patchAccountSettings(response);
        this._setPreferredLanguage(response);
        this._setPreferredCurrency(response);
      },
      error: error => {
        this._notificationService.showSnackbar('Error', 'Oops something went wrong with fetching users data!');
      }
    })
  }

  private _patchAccountSettings(userData: IUser): void {
    this._userService.accountSettingsForm.patchValue({
      name: userData.name,
      email: userData.email,
      preferred_language: userData.preferred_language ?? 'English',
      currency: userData.currency ?? 'Dollar - $'
    })
  }

  private _setPreferredLanguage(response: IUser): void {
    response?.preferred_language === 'English' || response?.preferred_language === undefined ? localStorage.setItem('exyl', 'en') : localStorage.setItem('exyl', 'sr');
    this._userService.userLanguageChanged.emit();
  }

  private _setPreferredCurrency(response: IUser): void {
    this._currencyService.setCurrencySymbol(response.currency.slice(-1));
  }
}
