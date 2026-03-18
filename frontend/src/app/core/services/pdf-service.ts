import { Injectable } from '@angular/core';
import { Transaction } from '../../shared/types/transaction.type';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  generateTransactionsReport(transactions: Transaction[]) {
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
    doc.text('BALANCETE FINANCEIRO - MOVIMENTAÇÃO DE CAIXA DO DEPARTAMENTO DE JOVENS', 14, 15, {
      maxWidth: 180,
    });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Finalidade: ', 14, 33);
    doc.setFont('helvetica', 'normal');
    const textWidth = doc.getTextWidth('Finalidade: ');
    doc.text(
      ' Controle e acompanhamento de gastos e receitas do caixa da juventude',
      14 + textWidth,
      33,
    );

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
    doc.text('Calebe Souza Guimarães', 14 + textWidth3, 45);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Data de emissão do relatório: ', 14, 51);
    const textWidth4 = doc.getTextWidth('Data de emissão do relatório: ');
    doc.setFont('helvetica', 'normal');
    doc.text(today, 14 + textWidth4, 51);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Detalhamento das Movimentações', 14, 63);

    const tableData = transactions.map((transaction) => [
      transaction.description,
      transaction.transactionType == 'INCOME' ? 'RECEITA' : 'DESPESA',
      transaction.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      new Date(transaction.transactionDate).toLocaleDateString(),
    ]);

    autoTable(doc, {
      head: [['Descrição', 'Tipo', 'Valor', 'Data']],
      body: [tableData, tableData],
      startY: 69,
    });

    doc.save('relatorio.pdf');
  }
}
