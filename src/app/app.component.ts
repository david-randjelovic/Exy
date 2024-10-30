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
export class AppComponent {
  public router = inject(Router);
}
