import { Component, input } from '@angular/core';

@Component({
  selector: 'exy-card',
  standalone: true,
  imports: [],
  templateUrl: './exy-card.component.html',
  styleUrl: './exy-card.component.css'
})
export class ExyCardComponent {
  public cardIcon = input.required<string>();
  public cardDescription = input.required<string>();
  public cardValue = input.required<number>();
  public cardPercentage = input.required<number>();
  public cardColor = input.required<string>();
  public cardFinance = input.required<boolean>();
}
