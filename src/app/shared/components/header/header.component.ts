import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { LanguageDropdownComponent } from "../language-dropdown/language-dropdown.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'exy-header',
  standalone: true,
  imports: [BreadcrumbModule, IconFieldModule, InputIconModule, InputTextModule, LanguageDropdownComponent, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  public items = [
    { label: 'Electronics' }, 
    { label: 'Computer' }, 
    { label: 'Accessories' }, 
    { label: 'Keyboard' }, 
    { label: 'Wireless' }
  ];
  
  public home = { icon: 'pi pi-home', routerLink: '/' };
  public currentTime: string = '';
  private timer: any;

  ngOnInit() {
    this._updateTime();
    this.timer = setInterval(() => this._updateTime(), 1000);
  }

  private _updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
