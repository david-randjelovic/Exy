import { Component, inject } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';
import { NgIf } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'exy-spinner',
  standalone: true,
  imports: [NgIf, ProgressSpinnerModule],
  template: `
    <div class="backdrop" *ngIf="spinnerService.loadingSubject()">
    <p-progressSpinner styleClass="exy-spinner"/> 
    </div>
  `,
  styles: [`
    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
    :host ::ng-deep .exy-spinner .p-progress-spinner-circle { 
      animation: custom-progress-spinner-dash 1.5s ease-in-out infinite, exy 6s ease-in-out infinite;
    } 
    
    @keyframes exy { 
        100%, 
        0% { 
            stroke: var(--primary-color); 
        } 
        20% { 
            stroke: var(--secondary-color); 
        } 
        40% { 
            stroke: var(--primary-color); 
        } 
        60% { 
            stroke: var(--secondary-color); 
        } 
        80% { 
            stroke: var(--primary-color); 
        } 
    }
    @keyframes custom-progress-spinner-dash {
        0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
        }
        50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35px;
        }
        100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124px;
        }
    }
  `]
})
export class SpinnerComponent {
  public spinnerService = inject(SpinnerService);
}