import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { IUser } from './interfaces/user.interface';
import { CurrencyService } from './services/currency.service';
import { NotificationService } from './services/notification.service';
import { UserService } from './services/user.service';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { SpinnerComponent } from "./shared/components/spinner.component";
import { LanguageService } from './services/language.service';

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
  private _languageService = inject(LanguageService);

  ngOnInit(): void {
    this._userService.getUserData().subscribe({
      next: response => {
        this._userService.userData = response;
        this._userService.patchAccountSettings(response);
        this._languageService.setPreferredLanguage(response);
        this._currencyService.setCurrencySymbol(response);
      },
      error: error => {
        this._notificationService.showSnackbar('Error', 'Oops something went wrong with fetching users data!');
      }
    })
  }
}
