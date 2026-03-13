import { Component } from '@angular/core';
import { SummaryCard } from '../../components/summary-card/summary-card';
import { RouterLink } from '@angular/router';
import { DefaultContainerLayout } from '../../components/default-container-layout/default-container-layout';
import { ModalAddTransaction } from '../../components/modal-add-transaction/modal-add-transaction';

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
