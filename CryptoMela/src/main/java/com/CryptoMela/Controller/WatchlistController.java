package com.CryptoMela.Controller;

import com.CryptoMela.Entity.Coin;
import com.CryptoMela.Entity.User;
import com.CryptoMela.Entity.Watchlist;
import com.CryptoMela.Service.CoinService;
import com.CryptoMela.Service.UserService;
import com.CryptoMela.Service.WatchlistService;
import com.CryptoMela.utils.CheckJwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/watchlist")
public class WatchlistController {
    @Autowired
    private WatchlistService watchlistService;
    @Autowired
    private UserService userService;
    @Autowired
    private CoinService coinService;

    @GetMapping("/user")
    public ResponseEntity<Watchlist> getUserWatchlist(
            @RequestHeader("Authorization") String token) throws Exception {
        String jwt= CheckJwt.checkJwt(token);
        User user =userService.findUserProfileByJwt(jwt);
        Watchlist watchlist = watchlistService.findUserWatchlist((long) user.getId());
        return ResponseEntity.ok(watchlist);
    }
    @GetMapping("/{watchlistId}")
    public ResponseEntity<Watchlist> getWatchlistById(
            @PathVariable Long watchlistId) throws Exception {

        Watchlist watchlist = watchlistService.findById(watchlistId);
        return ResponseEntity.ok(watchlist);
    }
    @GetMapping("/add/coin/{coinId}")
    public ResponseEntity<Coin> addItemToWatchlist(
            @RequestHeader("Authorization") String ttoken,
            @PathVariable String coinId) throws Exception {

        String jwt=CheckJwt.checkJwt(ttoken);
        User user = userService.findUserProfileByJwt(jwt);
        Coin coin = coinService.findById(coinId);
        Coin addedCoin = watchlistService.addItemToWatchlist(coin, user);
        return ResponseEntity.ok(addedCoin);
    }
}
