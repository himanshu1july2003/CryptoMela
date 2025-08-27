package com.CryptoMela.Service;

import com.CryptoMela.Entity.PaymentDetails;
import com.CryptoMela.Entity.User;
import com.CryptoMela.Repository.PaymentDetalsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PaymentDetailsServiceImpl implements PaymentDetailsService {

    @Autowired
    private PaymentDetalsRepo paymentDetalsRepo;

    @Override
    public PaymentDetails addPaymentDetails(String accountNumber, String accountHolderName, String ifsc, String bankName, User user) {
        // Step 1: Check if payment details for this user already exist.
        Optional<PaymentDetails> existingPaymentDetailsOptional = paymentDetalsRepo.findByUserId((long) user.getId());

        if (existingPaymentDetailsOptional.isPresent()) {
            // Step 2: If they exist, update the existing record.
            PaymentDetails existingPaymentDetails = existingPaymentDetailsOptional.get();
            existingPaymentDetails.setAccountNumber(accountNumber);
            existingPaymentDetails.setAccountHolderName(accountHolderName);
            existingPaymentDetails.setIfsc(ifsc);
            existingPaymentDetails.setBankName(bankName);
            return paymentDetalsRepo.save(existingPaymentDetails);
        } else {
            // Step 3: If no payment details exist, create and save a new one.
            PaymentDetails paymentDetails = new PaymentDetails();
            paymentDetails.setAccountNumber(accountNumber);
            paymentDetails.setAccountHolderName(accountHolderName);
            paymentDetails.setIfsc(ifsc);
            paymentDetails.setBankName(bankName);
            paymentDetails.setUser(user);
            return paymentDetalsRepo.save(paymentDetails);
        }
    }

    @Override
    public PaymentDetails getUsersPaymentDetails(User user) {
        // This method is fine, but it will return null if no details are found.
        // It's better to return an Optional or throw an exception.
        return paymentDetalsRepo.findByUserId((long) user.getId()).orElse(null);
    }
}