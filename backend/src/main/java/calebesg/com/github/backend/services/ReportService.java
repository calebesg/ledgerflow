package calebesg.com.github.backend.services;

import calebesg.com.github.backend.domain.entity.User;
import calebesg.com.github.backend.dto.OrganizationResponseDTO;
import calebesg.com.github.backend.dto.TransactionReportDTO;
import calebesg.com.github.backend.dto.TransactionResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final TransactionService transactionService;
    private final UserService userService;
    private final OrganizationService organizationService;

    public TransactionReportDTO getTransactionReport() {
        User user = userService.getAuthenticatedUser();

        OrganizationResponseDTO organizationDto = organizationService.getOrganization();
        List<TransactionResponseDTO> transactionsDto = transactionService.getAllTransactions();

        return new TransactionReportDTO(
                organizationDto.organizationName(),
                organizationDto.reportTitle(),
                organizationDto.purpose(),
                user.getName(),
                transactionsDto
        );
    }
}
