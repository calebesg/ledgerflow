package calebesg.com.github.backend.controllers;

import calebesg.com.github.backend.domain.entity.Transaction;
import calebesg.com.github.backend.domain.entity.User;
import calebesg.com.github.backend.dto.TransactionRequestDTO;
import calebesg.com.github.backend.infrastructure.exception.UserNotFoundException;
import calebesg.com.github.backend.infrastructure.security.TokenService;
import calebesg.com.github.backend.repositories.TransactionRepository;
import calebesg.com.github.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/transaction")
public class TransactionController {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final TokenService tokenService;

    @PostMapping("/new")
    public ResponseEntity<Transaction> createTransaction(@RequestBody TransactionRequestDTO body, @RequestHeader("Authorization") String token) {
        User user = userRepository.findByEmail(tokenService.validateToken(token)).orElseThrow(UserNotFoundException::new);

        Transaction transaction = new Transaction();
        transaction.setTransactionDate(body.dataTransaction());
        transaction.setTypeTransaction(body.typeTransaction());
        transaction.setDescription(body.description());
        transaction.setAmount(body.amount());
        transaction.setUser(user);

        var newTransaction = transactionRepository.save(transaction);
        return ResponseEntity.ok(newTransaction);
    }
}
