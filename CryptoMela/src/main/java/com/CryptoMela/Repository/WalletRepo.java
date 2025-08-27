package com.CryptoMela.Repository;

import com.CryptoMela.Entity.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WalletRepo extends JpaRepository<Wallet,Long> {

    public Wallet findByUserId(Long id);
}
