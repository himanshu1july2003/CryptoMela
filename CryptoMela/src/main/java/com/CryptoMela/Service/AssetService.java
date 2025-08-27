package com.CryptoMela.Service;

import com.CryptoMela.Entity.Asset;
import com.CryptoMela.Entity.Coin;
import com.CryptoMela.Entity.User;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AssetService {
    Asset createAsset(User user, Coin coin, double quantity);

    Asset getAssetById(Long assetId) throws Exception;

//    Asset getAssetByUserIdAndId(Long userId, Long assetId) throws Exception;

    List<Asset> getUsersAssets(Long userId);

    Asset updateAsset(User user, Coin coin, double quantityChange);

    Asset findAssetByUserIdAndCoinId(Long userId, String coinId);

    void deleteAsset(Long assetId);
}
