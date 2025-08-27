package com.CryptoMela.Entity;

import com.CryptoMela.domain.PaymentMethod;
import com.CryptoMela.domain.PaymentorderStatus;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class PaymentOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long amount;

    private PaymentorderStatus status;

    private PaymentMethod paymentMethod;

    @ManyToOne
    private User user;
}
