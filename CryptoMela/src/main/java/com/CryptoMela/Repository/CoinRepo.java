package com.CryptoMela.Repository;

import com.CryptoMela.Entity.Coin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoinRepo extends JpaRepository<Coin,String> {
}
