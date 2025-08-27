package com.CryptoMela.Service;

import com.CryptoMela.Entity.PaymentDetails;
import com.CryptoMela.Entity.User;
import org.springframework.stereotype.Service;

@Service
public interface PaymentDetailsService {
    public PaymentDetails addPaymentDetails(String accountNumber,
                                            String accountHolderName,
                                            String ifsc,
                                            String bankName,
                                            User user);

    public PaymentDetails getUsersPaymentDetails(User user);
}
