package com.CryptoMela.Repository;

import com.CryptoMela.Entity.TwoFactorOTP;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface TwoFactorOtpRepo extends JpaRepository<TwoFactorOTP,String> {
    TwoFactorOTP findByEmail(String email);
    @Transactional
    void deleteByEmail(String email); // This will delete all rows matching the email
}
