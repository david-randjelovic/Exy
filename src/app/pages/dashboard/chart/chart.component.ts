import { Component, inject } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ChartService } from '../../../services/chart.service';

@Component({
  selector: 'exy-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent {
  public chartService = inject(ChartService);
}
