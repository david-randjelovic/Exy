import { Component, inject, input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'exy-sidebar-nav-item',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-nav-item.component.html',
  styleUrl: './sidebar-nav-item.component.css'
})
export class SidebarNavItemComponent implements OnInit {
  public router = inject(Router);
  public itemClass = input.required<string>();
  public itemName = input.required<string>();
  public formattedName: string = '';
  
  ngOnInit(): void {
    this.formattedName = this.itemName().toLowerCase().replace(/\s+/g, '-');
  }

  public navigate(): void {
    this.formattedName = this.itemName().toLowerCase().replace(/\s+/g, '-');
    console.log(this.formattedName);
    this.router.navigateByUrl(this.formattedName);
  }
}
