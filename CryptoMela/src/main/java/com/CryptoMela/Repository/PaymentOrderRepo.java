package com.CryptoMela.Repository;

import com.CryptoMela.Entity.PaymentOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentOrderRepo extends JpaRepository<PaymentOrder,Long> {
}
