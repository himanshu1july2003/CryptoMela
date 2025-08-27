package com.CryptoMela.Entity;

import com.CryptoMela.domain.VerificationTpe;
import lombok.Data;

@Data
public class TwoFactorAuth {
    private boolean isEnabled=false;
    private VerificationTpe sendTo;
}
