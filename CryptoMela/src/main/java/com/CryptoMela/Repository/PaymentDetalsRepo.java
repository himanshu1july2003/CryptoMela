package com.CryptoMela.Repository;

import com.CryptoMela.Entity.PaymentDetails;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PaymentDetalsRepo extends JpaRepository<PaymentDetails,Long> {
    @Query("SELECT pd FROM PaymentDetails pd WHERE pd.user.id = :userId")
    Optional<PaymentDetails> findByUserId(@Param("userId") Long userId);
}
