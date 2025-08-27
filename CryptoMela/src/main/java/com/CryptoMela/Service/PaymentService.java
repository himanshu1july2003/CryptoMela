package com.CryptoMela.Service;

import com.CryptoMela.Entity.PaymentOrder;
import com.CryptoMela.Entity.PaymentResponse;
import com.CryptoMela.Entity.User;
import com.CryptoMela.domain.PaymentMethod;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import org.springframework.stereotype.Service;

@Service
public interface PaymentService {
    PaymentOrder createOrder(User user, Long amount, PaymentMethod paymentMethod);
    PaymentOrder getPaymentOrderById(Long id) throws Exception;

    Boolean proccedPaymentOrder(PaymentOrder paymentOrder, String paymentId) throws RazorpayException;

    PaymentResponse createRazorpayPaymentLink(User user, Long amount,Long orderId) throws Exception;

    PaymentResponse createStripePaymentLink(User user, Long amount, Long orderId) throws StripeException;
}
