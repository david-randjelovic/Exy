import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LanguageService } from '../../services/language.service';
import { CurrencyService } from '../../services/currency.service';
import { NotificationService } from '../../services/notification.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const languageService = inject(LanguageService);
  const currencyService = inject(CurrencyService);
  const notificationService = inject(NotificationService);

  const token: string | null = localStorage.getItem('exyt'); 
  if(token) {
    if(!userService.userData) {
      userService.getUserData().subscribe({
        next: response => {
          userService.userData = response;
          userService.patchAccountSettings(response);
          languageService.setPreferredLanguage(response);
          currencyService.setCurrencySymbol(response);
        },
        error: error => {
          notificationService.showSnackbar('Error', 'Oops something went wrong with fetching users data!');
        }
      })
    }
    return true;
  } else {
    inject(Router).navigateByUrl('/login');
    return false;
  }
};
