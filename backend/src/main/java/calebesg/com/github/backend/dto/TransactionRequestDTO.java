package calebesg.com.github.backend.dto;

import calebesg.com.github.backend.domain.enums.TransactionType;

import java.math.BigDecimal;
import java.time.LocalDate;

public record TransactionRequestDTO(
        String description,
        LocalDate transactionDate,
        TransactionType transactionType,
        BigDecimal amount
) {
}
