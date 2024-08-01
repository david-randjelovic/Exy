import { Component } from '@angular/core';
import { SidebarNavItemComponent } from "./sidebar-nav-item/sidebar-nav-item.component";

@Component({
  selector: 'exy-sidebar',
  standalone: true,
  imports: [SidebarNavItemComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
