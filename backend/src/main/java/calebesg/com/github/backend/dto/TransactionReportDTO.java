package calebesg.com.github.backend.dto;

import java.util.List;

public record TransactionReportDTO(
        String organizationName,
        String reportTitle,
        String reportPurpose,
        String userName,
        List<TransactionResponseDTO> transactions
) {
}
