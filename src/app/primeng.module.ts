import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';

const PrimeComponents = [
  ButtonModule,
  InputGroupModule,
  InputGroupAddonModule,
  ToastModule,
  InputTextModule,
  ProgressSpinnerModule,
  InputIconModule,
  IconFieldModule
];

@NgModule({
  exports: [PrimeComponents]
})
export class PrimeNgModule {}
