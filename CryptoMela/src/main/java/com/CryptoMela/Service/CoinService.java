package com.CryptoMela.Service;

import com.CryptoMela.Entity.Coin;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface CoinService {
    List<Coin> getCoinList(int page);
    String getCoinsDetail(String coinId);
    String getMarketChart(String coinID, int days);
    Coin findById(String id) throws Exception;
    String SearchCOin(String keyword);
    String getTop50();
    String getTrendingCoins();
}
