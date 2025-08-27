package com.CryptoMela.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "coin")
public class Coin {
        @Id
        private String id;
        private String symbol;
        private String name;
        private String image;
        @JsonProperty("current_price")
        private Double currentPrice;

        @JsonProperty("market_cap")
        private Long marketCap;

        @JsonProperty("market_cap_rank")
        private Integer marketCapRank;

        @JsonProperty("fully_diluted_valuation")
        private Long fullyDilutedValuation;

        @JsonProperty("total_volume")
        private Long totalVolume;

        @JsonProperty("high_24h")
        private Double high24h;

        @JsonProperty("low_24h")
        private Double low24h;

        @JsonProperty("price_change_24h")
        private Double priceChange24h;

        @JsonProperty("price_change_percentage_24h")
        private Double priceChangePercentage24h;

        @JsonProperty("market_cap_change_24h")
        private Double marketCapChange24h;

        @JsonProperty("market_cap_change_percentage_24h")
        private Double marketCapChangePercentage24h;

        @JsonProperty("circulating_supply")
        private Double circulatingSupply;

        @JsonProperty("total_supply")
        private Double totalSupply;

        @JsonProperty("max_supply")
        private Double maxSupply;

        private Double ath;

        @JsonProperty("ath_change_percentage")
        private Double athChangePercentage;

        @JsonProperty("ath_date")
        private String athDate;

        private Double atl;

        @JsonProperty("atl_change_percentage")
        private Double atlChangePercentage;

        @JsonProperty("atl_date")
        private String atlDate;
        @JsonProperty("last_updated")
        private String lastUpdated;
    }