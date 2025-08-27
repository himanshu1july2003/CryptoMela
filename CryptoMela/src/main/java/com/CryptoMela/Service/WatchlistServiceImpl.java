package com.CryptoMela.Service;

import com.CryptoMela.Entity.Coin;
import com.CryptoMela.Entity.User;
import com.CryptoMela.Entity.Watchlist;
import com.CryptoMela.Repository.WatchlistRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WatchlistServiceImpl implements WatchlistService {
    @Autowired
    private WatchlistRepo watchlistRepo;

    @Override
    public Watchlist findUserWatchlist(Long userId) throws Exception {
        Watchlist list=watchlistRepo.findByUserId(userId);
        if(list==null)
        {
            throw new Exception("Watchlist Not found");
        }
        return list;
    }

    @Override
    public Watchlist createWatchlist(User user) {
        Watchlist watchlist=new Watchlist();
        watchlist.setUser(user);
        return watchlistRepo.save(watchlist);

    }

    @Override
    public Watchlist findById(Long id) throws Exception {
        Optional<Watchlist> watchlist=watchlistRepo.findById(id);
        if(watchlist.isEmpty())
        {
            throw new Exception("Watchlist Not found");
        }
        return watchlist.get();
    }

    @Override
    public Coin addItemToWatchlist(Coin coin, User user) throws Exception {
        Watchlist watchlist=findUserWatchlist((long) user.getId());
        if(watchlist.getCoins().contains(coin))
        {
            watchlist.getCoins().remove(coin);
        }
        else watchlist.getCoins().add(coin);
        watchlistRepo.save(watchlist);
         return coin;
    }
}
