package calebesg.com.github.backend.dto;

import calebesg.com.github.backend.domain.enums.TransactionType;
import jakarta.validation.constraints.NotBlank;

import java.math.BigDecimal;
import java.time.LocalDate;

public record TransactionRequestDTO(
        @NotBlank(message = "Descrição é obrigatória")
        String description,
        @NotBlank(message = "Data da transação é obrigatória")
        LocalDate transactionDate,
        @NotBlank(message = "Tipo da transação é obrigatório")
        TransactionType transactionType,
        @NotBlank(message = "Valor é obrigatório")
        BigDecimal amount
) {
}
