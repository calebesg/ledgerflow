package calebesg.com.github.backend.dto;

import calebesg.com.github.backend.domain.entity.Transaction;
import calebesg.com.github.backend.domain.enums.TransactionType;

import java.math.BigDecimal;
import java.time.LocalDate;

public record TransactionResponseDTO (
        Long id,
        String description,
        LocalDate transactionDate,
        TransactionType transactionType,
        BigDecimal amount
) {
    public static TransactionResponseDTO fromEntity(Transaction transaction) {
        return new TransactionResponseDTO(
                transaction.getId(),
                transaction.getDescription(),
                transaction.getTransactionDate(),
                transaction.getTransactionType(),
                transaction.getAmount()
        );
    }
}
