package com.CryptoMela.Entity;

import com.CryptoMela.Repository.WalletRepo;
import com.CryptoMela.Service.WalletService;
import com.CryptoMela.domain.OrderType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class WalletServiceImpl implements WalletService {
    @Autowired
    private WalletRepo repo;

    @Override
    public Wallet getUserWallet(User user) {
        Wallet wallet = repo.findByUserId((long) user.getId());
        if (wallet == null) {
            wallet = new Wallet();
            wallet.setUser(user);
            repo.save(wallet);
        }
        return wallet;
    }

    @Override
    public Wallet addBalance(Wallet wallet, Long money) {
        BigDecimal balance = wallet.getBalance();
        BigDecimal amountToAdd = BigDecimal.valueOf(money);
        BigDecimal newBalance = balance.add(amountToAdd);
        wallet.setBalance(newBalance);
        repo.save(wallet);
        return wallet;
    }

    // Corrected WalletServiceImpl.java

    @Override
    public Wallet findWalletById(Long id) throws Exception {
        // Corrected to use findById for searching by the wallet's primary key
        Optional<Wallet> walletOptional = repo.findById(id);

        if (walletOptional.isPresent()) {
            return walletOptional.get();
        }

        // The wallet was not found by its ID
        throw new Exception("Id not Found");
    }

    @Override
    public Wallet walletToWalletTransfer(User sender, Wallet receiver, Long amount) throws Exception {
        Wallet senderWallet = getUserWallet(sender);
        BigDecimal balance = senderWallet.getBalance();

        // Check if balance is LESS THAN the amount.
        if (senderWallet.getBalance().compareTo(BigDecimal.valueOf(amount)) < 0) {
            throw new Exception("Insufficient Balance");
        }

        BigDecimal amountToAdd = BigDecimal.valueOf(amount);
        BigDecimal newBalance = balance.subtract(amountToAdd);
        senderWallet.setBalance(newBalance);
        repo.save(senderWallet);

        BigDecimal balance2 = receiver.getBalance();
        BigDecimal newBalance2 = balance2.add(amountToAdd);
        receiver.setBalance(newBalance2);
        repo.save(receiver);

        return senderWallet;
    }

    @Override
    public Wallet payOrderAmount(Order order, User user) throws Exception {
        Wallet wallet = getUserWallet(user);

        if (order.getOrderType().equals(OrderType.BUY)) {
            // Check for sufficient funds first
            if (wallet.getBalance().compareTo(order.getPrice()) < 0) {
                throw new Exception("Insufficient Balance");
            }

            // Subtract the order price from the wallet balance
            BigDecimal newBalance = wallet.getBalance().subtract(order.getPrice());

            // Update the wallet's balance with the new, reduced amount.
            wallet.setBalance(newBalance);

        } else { // OrderType.SELL
            // Add the order price to the wallet balance
            BigDecimal newBalance = wallet.getBalance().add(order.getPrice());
            wallet.setBalance(newBalance);
        }

        // Save the updated wallet to the database.
        repo.save(wallet);
        return wallet;
    }
}
