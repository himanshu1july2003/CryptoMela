package com.CryptoMela.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class TwoFactorOTP {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // auto increment
    private Long id;
    private String email;
    private String otp;
    private String jwt;
}

