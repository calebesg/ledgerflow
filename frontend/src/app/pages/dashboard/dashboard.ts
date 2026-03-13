import { Component } from '@angular/core';
import { SummaryCard } from '../../components/summary-card/summary-card';
import { RouterLink } from '@angular/router';
import { DefaultContainerLayout } from '../../components/default-container-layout/default-container-layout';

@Component({
  selector: 'app-dashboard',
  imports: [SummaryCard, RouterLink, DefaultContainerLayout],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
