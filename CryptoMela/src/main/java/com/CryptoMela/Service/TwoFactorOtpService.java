package com.CryptoMela.Service;

import com.CryptoMela.Entity.TwoFactorOTP;
import com.CryptoMela.Entity.User;
import org.springframework.stereotype.Service;

@Service
public interface TwoFactorOtpService {
    TwoFactorOTP createTwoFactorOtp( String otp, String jwt,String email);

    TwoFactorOTP findById(String id);

    boolean verifytwoFactorOtp(TwoFactorOTP twoFactorOTP, String otp);

    void deleteTwoFactorOtp(TwoFactorOTP twoFactorOTP);

}