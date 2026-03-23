package calebesg.com.github.backend.controllers;

import calebesg.com.github.backend.dto.TransactionReportDTO;
import calebesg.com.github.backend.services.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/report")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/transactions")
    public ResponseEntity<TransactionReportDTO> getTransactionsReport() {
        return ResponseEntity.ok(reportService.getTransactionReport());
    }
}
