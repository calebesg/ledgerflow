import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary-card',
  imports: [],
  templateUrl: './summary-card.html',
  styleUrl: './summary-card.css',
})
export class SummaryCard {
  @Input() cardTitle: string = '';
  @Input() amount: number = 0;
  @Input() icon: string = '';
  @Input() iconColor: string = '';
  @Input() bgColor: string = 'bg-white';
  @Input() textColor: string = 'text-text';
}
