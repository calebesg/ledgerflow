import { Injectable } from '@angular/core';
import { Transaction } from '../../shared/types/transaction.type';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth-service';
import { ToastrService } from 'ngx-toastr';
import { TransactionReport } from '../../shared/types/transaction-report.type';
import { formatCurrencyPtBR } from '../../shared/utils/format-currency-pt-BR';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private BASE_URL: string = 'http://localhost:8080';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private toast: ToastrService,
  ) {}

  generateTransactionsReport() {
    const token = sessionStorage.getItem('auth-token') || '';

    this.httpClient
      .get<TransactionReport>(`${this.BASE_URL}/report/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe({
        next: (response) => this.generatePdf(response),
        error: (error) => {
          console.warn(error);
          this.toast.error('Ops! Não foi possível gerar o relatório');
        },
      });
  }

  private generatePdf(dataReport: TransactionReport) {
    const { reportPurpose, reportTitle, userName, transactions } = dataReport;

    const doc = new jsPDF();

    const totalIncome = transactions
      .filter((transaction) => transaction.transactionType === 'INCOME')
      .reduce((sum, transation) => sum + transation.amount, 0);

    const totalExpense = transactions
      .filter((transaction) => transaction.transactionType === 'EXPENSE')
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    const today = new Date().toLocaleDateString('pt-BR');
    const firstTransactionDate = new Date(
      transactions[transactions.length - 1].transactionDate,
    ).toLocaleDateString('pt-BR');
    const lastTransactionDate = new Date(transactions[0].transactionDate).toLocaleDateString(
      'pt-BR',
    );

    // HEADER DOCUMENT
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(reportTitle.toLocaleUpperCase(), 14, 15, {
      maxWidth: 180,
    });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Finalidade: ', 14, 33);
    const textWidth = doc.getTextWidth('Finalidade: ');
    doc.setFont('helvetica', 'normal');
    doc.text(reportPurpose, 14 + textWidth, 33);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Período das movimentações: ', 14, 39);
    const textWidth2 = doc.getTextWidth('Período das movimentações: ');
    doc.setFont('helvetica', 'normal');
    doc.text(`${firstTransactionDate} até ${lastTransactionDate}`, 14 + textWidth2, 39);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Responsável: ', 14, 45);
    const textWidth3 = doc.getTextWidth('Responsável: ');
    doc.setFont('helvetica', 'normal');
    doc.text(userName, 14 + textWidth3, 45);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Data de emissão do relatório: ', 14, 51);
    const textWidth4 = doc.getTextWidth('Data de emissão do relatório: ');
    doc.setFont('helvetica', 'normal');
    doc.text(today, 14 + textWidth4, 51);

    // RESUMO DO CAIXA (RECEITAS, DESPESAS, TOTAL)
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Resumo do Caixa:', 14, 63);

    const tableDataResume = [
      formatCurrencyPtBR(totalIncome),
      formatCurrencyPtBR(totalExpense),
      formatCurrencyPtBR(totalIncome - totalExpense),
    ];

    autoTable(doc, {
      head: [['Receita', 'Despesas', 'Total em caixa']],
      body: [tableDataResume],
      startY: 66,
    });

    // TABELA DE MOVIMENTAÇÕES
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Detalhamento das Movimentações', 14, 89);

    const tableData = transactions.map((transaction) => [
      transaction.description,
      transaction.transactionType == 'INCOME' ? 'RECEITA' : 'DESPESA',
      transaction.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      new Date(transaction.transactionDate).toLocaleDateString(),
    ]);

    autoTable(doc, {
      head: [['Descrição', 'Tipo', 'Valor', 'Data']],
      body: tableData,
      startY: 92,
    });

    doc.save('relatorio.pdf');
  }
}
