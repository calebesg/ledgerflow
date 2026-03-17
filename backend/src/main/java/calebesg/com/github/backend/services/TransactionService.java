package calebesg.com.github.backend.services;

import calebesg.com.github.backend.domain.entity.Transaction;
import calebesg.com.github.backend.domain.entity.User;
import calebesg.com.github.backend.dto.TransactionRequestDTO;
import calebesg.com.github.backend.dto.TransactionResponseDTO;
import calebesg.com.github.backend.infrastructure.exception.TransactionNotFoundException;
import calebesg.com.github.backend.repositories.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final UserService userService;

    public TransactionResponseDTO createTransaction(TransactionRequestDTO dataTransaction) {
        User user = userService.getAuthenticatedUser();

        var transaction = new Transaction();
        transaction.setTransactionDate(dataTransaction.transactionDate());
        transaction.setTransactionType(dataTransaction.transactionType());
        transaction.setDescription(dataTransaction.description());
        transaction.setAmount(dataTransaction.amount());
        transaction.setUser(user);

        return TransactionResponseDTO.fromEntity(transactionRepository.save(transaction));
    }

    public List<TransactionResponseDTO> getAllTransactions() {
        User user = userService.getAuthenticatedUser();
        List<Transaction> transactions = transactionRepository.findByUser_IdAndDeletedAtIsNullOrderByTransactionDateDesc(user.getId());
        return transactions.stream().map(TransactionResponseDTO::fromEntity).toList();
    }

    public void deleteTransaction(Long id) {
        User user = userService.getAuthenticatedUser();

        Transaction transaction = transactionRepository
                .findByUser_IdAndIdAndDeletedAtIsNull(user.getId(), id)
                .orElseThrow(TransactionNotFoundException::new);

        transaction.setDeletedAt(LocalDateTime.now());
        transactionRepository.save(transaction);
    }
}
