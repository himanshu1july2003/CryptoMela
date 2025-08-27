package com.CryptoMela.Service;

import com.CryptoMela.Entity.Coin;
import com.CryptoMela.Repository.CoinRepo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.mail.Header;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
public class CoinServiceImpl implements CoinService {
    @Autowired
    private CoinRepo repo;
    @Autowired
    private ObjectMapper objectMapper;
    @Override
    public List<Coin> getCoinList(int page) {
        String url="https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10&page="+page;
        RestTemplate restTemplate=new RestTemplate();
        try{
            HttpHeaders headers=new HttpHeaders();
            HttpEntity<String> entity=new HttpEntity<String>("parameters",headers);
            ResponseEntity<String> response=restTemplate.exchange(url,
                    HttpMethod.GET,
                    entity,
                    String.class);
            List<Coin> coinList=objectMapper.readValue(response.getBody(),new TypeReference<List<Coin>>(){});
            return coinList;
        } catch (JsonMappingException e) {
            throw new RuntimeException(e);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public String getCoinsDetail(String coinId) {
        String url = "https://api.coingecko.com/api/v3/coins/"+coinId;
        RestTemplate restTemplate = new RestTemplate();
        try {
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
            ResponseEntity<String> response = restTemplate.exchange(url,
                    HttpMethod.GET,
                    entity,
                    String.class);
            JsonNode jsonNode=objectMapper.readTree(response.getBody());
            Coin coin=new Coin();
            coin.setId(jsonNode.get("id").asText());
            coin.setName(jsonNode.get("name").asText());
            coin.setSymbol(jsonNode.get("symbol").asText());
            coin.setImage(jsonNode.get("image").get("large").asText());

            JsonNode marketData=jsonNode.get("market_data");

            coin.setCurrentPrice(marketData.get("current_price").get("usd").asDouble());
            coin.setMarketCap(marketData.get("market_cap").get("usd").asLong());
            coin.setMarketCapRank(marketData.get("market_cap_rank").asInt());
            coin.setTotalVolume(marketData.get("total_volume").get("usd").asLong());
            coin.setHigh24h(marketData.get("high_24h").get("usd").asDouble());
            coin.setLow24h(marketData.get("low_24h").get("usd").asDouble());
            coin.setPriceChange24h(marketData.get("price_change_24h").get("usd").asDouble());
            coin.setPriceChangePercentage24h(marketData.get("price_change_percentage_24h").get("usd").asDouble());

            coin.setMarketCapChange24h(marketData.get("market_cap_change_24h").asDouble());
            coin.setMarketCapChangePercentage24h(marketData.get("market_cap_change_percentage_24h").asDouble());

            coin.setTotalSupply(marketData.get("total_supply").get("usd").asDouble());
            repo.save(coin);

            return response.getBody();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public String getMarketChart(String coinId, int days) {
        String url = "https://api.coingecko.com/api/v3/coins/" + coinId + "/market_chart?vs_currency=usd&days=" + days;
        RestTemplate restTemplate = new RestTemplate();
        try {
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
            ResponseEntity<String> response = restTemplate.exchange(url,
                    HttpMethod.GET,
                    entity,
                    String.class);
            return response.getBody();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Coin findById(String id) throws Exception {
        String url = "https://api.coingecko.com/api/v3/coins/" + id;
        RestTemplate restTemplate = new RestTemplate();
        try {
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
            ResponseEntity<String> response = restTemplate.exchange(url,
                    HttpMethod.GET,
                    entity,
                    String.class);
            JsonNode jsonNode = objectMapper.readTree(response.getBody());
            Coin coin = new Coin();

            // Basic fields (assuming these always exist)
            coin.setId(jsonNode.get("id").asText());
            coin.setName(jsonNode.get("name").asText());
            coin.setSymbol(jsonNode.get("symbol").asText());

            JsonNode imageNode = jsonNode.get("image");
            if (imageNode != null && imageNode.has("large")) {
                coin.setImage(imageNode.get("large").asText());
            }

            JsonNode marketData = jsonNode.get("market_data");
            if (marketData == null) {
                throw new Exception("Market data not available for this coin.");
            }

            // Apply null checks to all market data fields
            JsonNode currentPriceNode = marketData.get("current_price");
            if (currentPriceNode != null && currentPriceNode.has("usd")) {
                coin.setCurrentPrice(currentPriceNode.get("usd").asDouble());
            }

            JsonNode marketCapNode = marketData.get("market_cap");
            if (marketCapNode != null && marketCapNode.has("usd")) {
                coin.setMarketCap(marketCapNode.get("usd").asLong());
            }

            JsonNode marketCapRankNode = marketData.get("market_cap_rank");
            if (marketCapRankNode != null) {
                coin.setMarketCapRank(marketCapRankNode.asInt());
            }

            JsonNode totalVolumeNode = marketData.get("total_volume");
            if (totalVolumeNode != null && totalVolumeNode.has("usd")) {
                coin.setTotalVolume(totalVolumeNode.get("usd").asLong());
            }

            JsonNode high24hNode = marketData.get("high_24h");
            if (high24hNode != null && high24hNode.has("usd")) {
                coin.setHigh24h(high24hNode.get("usd").asDouble());
            }

            JsonNode low24hNode = marketData.get("low_24h");
            if (low24hNode != null && low24hNode.has("usd")) {
                coin.setLow24h(low24hNode.get("usd").asDouble());
            }

            JsonNode priceChange24hNode = marketData.get("price_change_24h");
            if (priceChange24hNode != null && priceChange24hNode.has("usd")) {
                coin.setPriceChange24h(priceChange24hNode.get("usd").asDouble());
            }

            JsonNode priceChangePercentage24hNode = marketData.get("price_change_percentage_24h");
            if (priceChangePercentage24hNode != null && priceChangePercentage24hNode.has("usd")) {
                coin.setPriceChangePercentage24h(priceChangePercentage24hNode.get("usd").asDouble());
            }

            JsonNode marketCapChange24hNode = marketData.get("market_cap_change_24h");
            if (marketCapChange24hNode != null) {
                coin.setMarketCapChange24h(marketCapChange24hNode.asDouble());
            }

            JsonNode marketCapChangePercentage24hNode = marketData.get("market_cap_change_percentage_24h");
            if (marketCapChangePercentage24hNode != null) {
                coin.setMarketCapChangePercentage24h(marketCapChangePercentage24hNode.asDouble());
            }

            JsonNode totalSupplyNode = marketData.get("total_supply");
            if (totalSupplyNode != null && totalSupplyNode.isDouble()) { // It's better to check if it's a number
                coin.setTotalSupply(totalSupplyNode.asDouble());
            }

            repo.save(coin);

            // This check is redundant and will never be true since `coin` is instantiated
            // if (coin == null) throw new Exception("Coin not found");

            return coin;
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch coin data for ID: " + id, e);
        }
    }
        @Override
    public String SearchCOin(String keyword) {
        String url = "https://api.coingecko.com/api/v3/search?query="+keyword;
        RestTemplate restTemplate = new RestTemplate();
        try {
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
            ResponseEntity<String> response = restTemplate.exchange(url,
                    HttpMethod.GET,
                    entity,
                    String.class);
            return response.getBody();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public String getTop50() {
        String url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=50&page=1";
        RestTemplate restTemplate = new RestTemplate();
        try {
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
            ResponseEntity<String> response = restTemplate.exchange(url,
                    HttpMethod.GET,
                    entity,
                    String.class);
            return response.getBody();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public String getTrendingCoins() {
        String url = "https://api.coingecko.com/api/v3/search/trending";
        RestTemplate restTemplate = new RestTemplate();
        try {
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
            ResponseEntity<String> response = restTemplate.exchange(url,
                    HttpMethod.GET,
                    entity,
                    String.class);
            return response.getBody();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
