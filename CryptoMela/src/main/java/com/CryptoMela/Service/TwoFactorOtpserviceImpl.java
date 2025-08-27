package com.CryptoMela.Service;

import com.CryptoMela.Entity.TwoFactorOTP;
import com.CryptoMela.Repository.TwoFactorOtpRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class TwoFactorOtpserviceImpl implements TwoFactorOtpService{

    @Autowired
    private TwoFactorOtpRepo repo;
    @Override
    public TwoFactorOTP createTwoFactorOtp(String otp, String jwt,String email) {
//        UUID uuid=UUID.randomUUID();
//        String id=uuid.toString();
        repo.deleteByEmail(email);
        TwoFactorOTP obj=new TwoFactorOTP();
        obj.setOtp(otp);
        obj.setEmail(email);
        obj.setJwt(jwt);
        System.out.println("Email: " + obj.getEmail());
        System.out.println("OTP: " + obj.getOtp());
        System.out.println("JWT: " + obj.getJwt());
        return repo.save(obj);
    }

    @Override
    public TwoFactorOTP findById(String id) {
        return repo.findByEmail(id);
    }


    @Override
    public boolean verifytwoFactorOtp(TwoFactorOTP twoFactorOTP, String otp) {
        return twoFactorOTP.getOtp().equals(otp);
    }

    @Override
    public void deleteTwoFactorOtp(TwoFactorOTP twoFactorOTP) {
        repo.delete(twoFactorOTP);
    }
}
