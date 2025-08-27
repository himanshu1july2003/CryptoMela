package com.CryptoMela.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class PaymentResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id; // Add this field as the primary key
    private String payment_url;
}
