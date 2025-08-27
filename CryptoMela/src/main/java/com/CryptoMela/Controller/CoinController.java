package com.CryptoMela.Controller;

import com.CryptoMela.Entity.Coin;
import com.CryptoMela.Service.CoinService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coins")
public class CoinController {
    @Autowired
    private CoinService service;
    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping
    public ResponseEntity<List<Coin>> getCoinList(@RequestParam("page") int page) //in parameters->
    {
        List<Coin> coins=service.getCoinList(page);
        return new ResponseEntity<>(coins, HttpStatus.ACCEPTED);
    }
    @GetMapping("/{coinId}/chart")
    public ResponseEntity<?> getMarketchart(@PathVariable String coinId,
                                                     @RequestParam("days") int days)throws Exception
    {
        String resp=service.getMarketChart(coinId,days);
        JsonNode jsonNode=objectMapper.readTree(resp);
        return new ResponseEntity<>(jsonNode, HttpStatus.ACCEPTED);
    }
    @GetMapping("/search")
    public ResponseEntity<?> searchCoin(@RequestParam("q") String keyword)throws Exception
    {
        String resp=service.SearchCOin(keyword);
        JsonNode jsonNode=objectMapper.readTree(resp);
        return new ResponseEntity<>(jsonNode, HttpStatus.OK);
    }
    @GetMapping("/top50")
    public ResponseEntity<?> gettop50ByMarketCapRank()throws Exception
    {
        String resp=service.getTop50();
        JsonNode jsonNode=objectMapper.readTree(resp);
        return new ResponseEntity<>(jsonNode, HttpStatus.OK);
    }
    @GetMapping("/trending")
    public ResponseEntity<?> getTrending()throws Exception
    {
        String resp=service.getTrendingCoins();
        JsonNode jsonNode=objectMapper.readTree(resp);
        return new ResponseEntity<>(jsonNode, HttpStatus.OK);
    }
}
