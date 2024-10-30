import { Component, OnDestroy, OnInit, Renderer2, signal } from '@angular/core';
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
  public screenWidth = signal<number>(window.innerWidth);
  public isMenuOpen = signal<boolean>(false);

  constructor(private _renderer: Renderer2) {}

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

  public toggleMenu(): void {
    this.isMenuOpen.update((prevState) => !prevState);
    if (this.isMenuOpen()) {
      this._renderer.addClass(document.body, 'no-scroll');
    } else {
      this._renderer.removeClass(document.body, 'no-scroll');
    }
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
