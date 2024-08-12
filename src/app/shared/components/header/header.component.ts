import { Component } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { LanguageDropdownComponent } from "../language-dropdown/language-dropdown.component";

@Component({
  selector: 'exy-header',
  standalone: true,
  imports: [BreadcrumbModule, IconFieldModule, InputIconModule, InputTextModule, LanguageDropdownComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  public items = [
    { label: 'Electronics' }, 
    { label: 'Computer' }, 
    { label: 'Accessories' }, 
    { label: 'Keyboard' }, 
    { label: 'Wireless' }
  ];

  public home = { icon: 'pi pi-home', routerLink: '/' };

}
