import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'exy-sidebar-nav-item',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-nav-item.component.html',
  styleUrl: './sidebar-nav-item.component.css'
})
export class SidebarNavItemComponent {
  public router = inject(Router);
  public itemClass = input.required<string>();
  public itemName = input.required<string>();

  public navigate(): void {
    this.router.navigateByUrl(this.itemName().toLocaleLowerCase())
  }
}
