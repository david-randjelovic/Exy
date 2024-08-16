import { Component, inject } from '@angular/core';
import { SidebarNavItemComponent } from "./sidebar-nav-item/sidebar-nav-item.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'exy-sidebar',
  standalone: true,
  imports: [SidebarNavItemComponent, TranslateModule],
  providers: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  public translate = inject(TranslateService);
}
