package com.CryptoMela.Repository;

import com.CryptoMela.Entity.Order;
import com.CryptoMela.Entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepo extends JpaRepository<OrderItem,Long> {
}
