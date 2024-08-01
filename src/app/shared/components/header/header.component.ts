import { Component } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'exy-header',
  standalone: true,
  imports: [BreadcrumbModule, IconFieldModule, InputIconModule, InputTextModule],
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
