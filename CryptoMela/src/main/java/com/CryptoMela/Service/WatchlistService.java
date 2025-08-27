package com.CryptoMela.Service;

import com.CryptoMela.Entity.Coin;
import com.CryptoMela.Entity.User;
import com.CryptoMela.Entity.Watchlist;
import org.springframework.stereotype.Service;

@Service
public interface WatchlistService {

    Watchlist findUserWatchlist(Long userId) throws Exception;
    Watchlist createWatchlist(User user);
    Watchlist findById(Long id) throws Exception;

    Coin addItemToWatchlist(Coin coin, User user) throws Exception;
}
