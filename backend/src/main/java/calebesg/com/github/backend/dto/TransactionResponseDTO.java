package calebesg.com.github.backend.dto;

import calebesg.com.github.backend.domain.enums.TransactionType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record TransactionResponseDTO (
        Long id,
        String description,
        LocalDateTime dataTransaction,
        TransactionType typeTransaction,
        BigDecimal amount
) {
}
