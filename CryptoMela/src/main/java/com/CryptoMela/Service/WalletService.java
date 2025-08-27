package com.CryptoMela.Service;

import com.CryptoMela.Entity.Order;
import com.CryptoMela.Entity.User;
import com.CryptoMela.Entity.Wallet;
import org.springframework.stereotype.Service;

@Service
public interface WalletService {
    Wallet getUserWallet(User user);
    Wallet addBalance(Wallet wallet, Long money);
    Wallet findWalletById(Long id) throws Exception;
    Wallet walletToWalletTransfer(User sender, Wallet receiver,Long amount) throws Exception;
    Wallet payOrderAmount(Order order,User user) throws Exception;
}
