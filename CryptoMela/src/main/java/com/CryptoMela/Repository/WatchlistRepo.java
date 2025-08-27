package com.CryptoMela.Repository;

import com.CryptoMela.Entity.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WatchlistRepo extends JpaRepository<Watchlist,Long> {
    Watchlist findByUserId(Long userId);
}
