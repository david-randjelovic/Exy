import { Component } from '@angular/core';
import { ExyCardComponent } from "../../shared/components/exy-card/exy-card.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ExyCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
