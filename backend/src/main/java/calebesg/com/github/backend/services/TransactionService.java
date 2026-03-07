package calebesg.com.github.backend.services;

import calebesg.com.github.backend.domain.entity.Transaction;
import calebesg.com.github.backend.domain.entity.User;
import calebesg.com.github.backend.dto.TransactionRequestDTO;
import calebesg.com.github.backend.dto.TransactionResponseDTO;
import calebesg.com.github.backend.infrastructure.exception.UserNotFoundException;
import calebesg.com.github.backend.infrastructure.security.TokenService;
import calebesg.com.github.backend.repositories.TransactionRepository;
import calebesg.com.github.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final TokenService tokenService;

    public TransactionResponseDTO createTransaction(TransactionRequestDTO dataTransaction, String token) {
        User user = userRepository.findByEmail(tokenService.validateToken(token)).orElseThrow(UserNotFoundException::new);

        var transaction = new Transaction();
        transaction.setTransactionDate(dataTransaction.dataTransaction());
        transaction.setTypeTransaction(dataTransaction.typeTransaction());
        transaction.setDescription(dataTransaction.description());
        transaction.setAmount(dataTransaction.amount());
        transaction.setUser(user);

        return TransactionResponseDTO.fromEntity(transactionRepository.save(transaction));
    }

    public List<TransactionResponseDTO> getAllTransactions(String token) {
        User user = userRepository.findByEmail(tokenService.validateToken(token)).orElseThrow(UserNotFoundException::new);
        List<Transaction> transactions = transactionRepository.findByUser_Id(user.getId());
        return transactions.stream().map(TransactionResponseDTO::fromEntity).toList();
    }
}
