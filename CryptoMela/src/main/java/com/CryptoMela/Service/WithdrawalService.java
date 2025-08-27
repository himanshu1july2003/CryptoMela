package com.CryptoMela.Service;

import com.CryptoMela.Entity.User;
import com.CryptoMela.Entity.Withdrawal;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface WithdrawalService {

    Withdrawal requestWithdrawal(Long amount, User user);

    Withdrawal proceedWithWithdrawal(Long withdrawalId, boolean accept);

    List<Withdrawal> getUsersWithdrawalHistory(User user);

    List<Withdrawal> getAllWithdrawalRequest();
}