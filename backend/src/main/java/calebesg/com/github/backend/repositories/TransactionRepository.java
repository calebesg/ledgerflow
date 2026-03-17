package calebesg.com.github.backend.repositories;

import calebesg.com.github.backend.domain.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUser_IdAndDeletedAtIsNullOrderByTransactionDateDesc(String id);
    Optional<Transaction> findByUser_IdAndIdAndDeletedAtIsNull(String userId, Long id);
}
