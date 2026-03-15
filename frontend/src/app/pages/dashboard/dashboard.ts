import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SummaryCard } from '../../shared/components/summary-card/summary-card';
import { DefaultContainerLayout } from '../../shared/components/default-container-layout/default-container-layout';
import { ModalAddTransaction } from '../../shared/components/modal-add-transaction/modal-add-transaction';

@Component({
  selector: 'app-dashboard',
  imports: [SummaryCard, RouterLink, DefaultContainerLayout, ModalAddTransaction],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  visibilityTransactionModal: boolean = false;

  changeVisibilityModal() {
    this.visibilityTransactionModal = !this.visibilityTransactionModal;
  }
}
