package calebesg.com.github.backend.dto;

import calebesg.com.github.backend.domain.enums.TransactionType;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.time.LocalDate;

public record TransactionRequestDTO(
        @NotBlank(message = "Descrição é obrigatória")
        String description,

        @NotNull(message = "Data da transação é obrigatória")
        @PastOrPresent
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate transactionDate,

        @NotNull(message = "Tipo da transação é obrigatório")
        @Enumerated(EnumType.STRING)
        TransactionType transactionType,

        @NotNull(message = "Valor é obrigatório")
        @Positive(message = "Valor deve ser maior que 0")
        BigDecimal amount
) {
}
