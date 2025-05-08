import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-supervisor-stats-cards',
  standalone: true,
  imports: [],
  templateUrl: './supervisor-stats-cards.component.html',
  styleUrl: './supervisor-stats-cards.component.css'
})
export class SupervisorStatsCardsComponent {
  @Input() alumnosAsignados: number = 0;
  @Input() informesPendientes: number = 0;
  @Input() totalInformes: number = 0;
}
