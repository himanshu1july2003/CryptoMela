package com.CryptoMela.Controller;

import com.CryptoMela.Entity.*;
import com.CryptoMela.Service.OrderService;
import com.CryptoMela.Service.PaymentService;
import com.CryptoMela.Service.UserService;
import com.CryptoMela.Service.WalletService;
import com.CryptoMela.utils.CheckJwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Optional;

@RestController
@RequestMapping("/wallet")
public class WalletController {
    @Autowired
    private WalletService walletService;
    @Autowired
    private UserService userService;

    @Autowired
    private PaymentService paymentService;
    @Autowired
    private OrderService orderService;
    @GetMapping
    public ResponseEntity<Wallet> getUserWallet(@RequestHeader("Authorization") String authHeader) throws Exception {
        // "Bearer " hatake actual JWT nikalo
        String token = CheckJwt.checkJwt(authHeader);

        User user = userService.findUserProfileByJwt(token);
        Wallet wallet = walletService.getUserWallet(user);

        return ResponseEntity.ok(wallet);
    }
    @PutMapping("/{walletId}/transfer")
    public ResponseEntity<?> walletToWalletTransfer(
            @RequestHeader("Authorization") String token,
            @PathVariable Long walletId,
            @RequestBody WalletTransaction req
    ) {
        try {
            String jwt = CheckJwt.checkJwt(token);
            // Step 1: Get the sender's user object from the JWT.
            User senderUser = userService.findUserProfileByJwt(jwt);

            // Step 2: Get the receiver's wallet using the path variable.
            Wallet receiverWallet = walletService.findWalletById(walletId);

            // Step 3: Call the service method, passing the senderUser and receiverWallet.
            Wallet updatedSenderWallet = walletService.walletToWalletTransfer(
                    senderUser, // Pass the sender's User object
                    receiverWallet,
                    req.getAmount()
            );

            return new ResponseEntity<>(updatedSenderWallet, HttpStatus.ACCEPTED);
        } catch (Exception e) {
            // Return a Bad Request status with the exception message
            // for errors like "Insufficient Balance" or "Id not Found".
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @PutMapping("/api/wallet/order/{orderId}/pay")
    public ResponseEntity<Wallet> payOrderPayment(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long orderId

    ) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);

        Order order = orderService.getOrderByID(orderId);

        Wallet wallet = walletService.payOrderAmount(order, user);

        return new ResponseEntity<>(wallet, HttpStatus.ACCEPTED);

    }
    @PutMapping("/deposit")
    public ResponseEntity<?>addMoneyTOWallet(
            @RequestHeader("Authorization") String token,
            @RequestParam(name="orderId") Long orderId,
            @RequestParam(name="paymentId") String paymentId
    ) throws Exception {

        String jwt=CheckJwt.checkJwt(token);
        User user = userService.findUserProfileByJwt(jwt);

        Wallet wallet = walletService.getUserWallet(user);
        PaymentOrder order=paymentService.getPaymentOrderById(orderId);
        Boolean status=paymentService.proccedPaymentOrder(order, String.valueOf(paymentId));
        if(wallet.getBalance()==null)
        {
            wallet.setBalance(BigDecimal.valueOf(0));
        }
        if(status)
        {
            wallet=walletService.addBalance(wallet,order.getAmount());
        }

        return new ResponseEntity<>(wallet, HttpStatus.ACCEPTED);
    }

}
