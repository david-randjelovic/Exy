import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { SpinnerComponent } from "./shared/components/spinner.component";
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';

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
