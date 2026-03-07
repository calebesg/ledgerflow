package calebesg.com.github.backend.controllers;

import calebesg.com.github.backend.dto.TransactionRequestDTO;
import calebesg.com.github.backend.dto.TransactionResponseDTO;
import calebesg.com.github.backend.infrastructure.security.TokenService;
import calebesg.com.github.backend.repositories.TransactionRepository;
import calebesg.com.github.backend.repositories.UserRepository;
import calebesg.com.github.backend.services.TransactionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/transaction")
public class TransactionController {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final TokenService tokenService;
    private final TransactionService transactionService;

    @PostMapping("/new")
    public ResponseEntity<TransactionResponseDTO> createTransaction(@RequestBody TransactionRequestDTO body, @RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(transactionService.createTransaction(body, token));
    }

    @GetMapping("/list")
    public ResponseEntity<List<TransactionResponseDTO>> getTransactions(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(transactionService.getAllTransactions(token));
    }
}
