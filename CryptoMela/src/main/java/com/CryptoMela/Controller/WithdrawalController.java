package com.CryptoMela.Controller;

import com.CryptoMela.Entity.User;
import com.CryptoMela.Entity.Wallet;
import com.CryptoMela.Entity.Withdrawal;
import com.CryptoMela.Service.UserService;
import com.CryptoMela.Service.WalletService;
import com.CryptoMela.Service.WithdrawalService;
import com.CryptoMela.utils.CheckJwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@RequestMapping("/api/withdrawal")
public class WithdrawalController {

    @Autowired
    private WithdrawalService withdrawalService;

    @Autowired
    private UserService userService;

    @Autowired
    private WalletService walletService;
@PostMapping("/withdrawal/{amount}")
public ResponseEntity<?> withdrawalRequest(
        @PathVariable Long amount,
        @RequestHeader("Authorization") String token) throws Exception {
    String jwt= CheckJwt.checkJwt(token);
    User user = userService.findUserProfileByJwt(jwt);
    Wallet userWallet = walletService.getUserWallet(user);

    Withdrawal withdrawal = withdrawalService.requestWithdrawal(amount, user);
    walletService.addBalance(userWallet, -withdrawal.getAmount());

    // WalletTransaction walletTransaction = walletTransactionService.createTransaction(
    //     userWallet,
    //     WalletTransactionType.WITHDRAWAL,
    //     null,
    //     "bank account withdrawal",
    //     withdrawal.getAmount()
    // );

    return new ResponseEntity<>(withdrawal, HttpStatus.OK);
}
    @PatchMapping("/admin/withdrawal/{id}/proceed/{accept}")
    public ResponseEntity<?> proceedWithDrawal(
            @PathVariable Long id,
            @PathVariable boolean accept,
            @RequestHeader("Authorization") String token) throws Exception {
        String jwt= CheckJwt.checkJwt(token);
        User user = userService.findUserProfileByJwt(jwt);

        Withdrawal withdrawal = withdrawalService.proceedWithWithdrawal(id, accept);

        Wallet userWallet = walletService.getUserWallet(user);
        if (!accept) {
            walletService.addBalance(userWallet, withdrawal.getAmount());
        }

        return new ResponseEntity<>(withdrawal, HttpStatus.OK);
    }
    @GetMapping("/admin/withdrawal")
    public ResponseEntity<List<Withdrawal>> getAllWithdrawalRequest(
            @RequestHeader("Authorization") String token) throws Exception {
        String jwt= CheckJwt.checkJwt(token);
        User user = userService.findUserProfileByJwt(jwt);

        List<Withdrawal> withdrawal = withdrawalService.getAllWithdrawalRequest();

        return new ResponseEntity<>(withdrawal, HttpStatus.OK);
    }

}
