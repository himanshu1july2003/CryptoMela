package com.CryptoMela.Service;

import com.CryptoMela.Entity.Asset;
import com.CryptoMela.Entity.Coin;
import com.CryptoMela.Entity.User;
import com.CryptoMela.Repository.AssetRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AssetServiceImpl implements AssetService {

    @Autowired
    private AssetRepo assetRepo;

    // This is the correct method that handles both creating and updating assets.
    @Override
    public Asset updateAsset(User user, Coin coin, double quantityChange) {
        // **यहाँ ठीक किया गया है:**
        // long value को Long object में बदलने के लिए Long.valueOf() का उपयोग करें
        Optional<Asset> existingAssetOptional = assetRepo.findByUserIdAndCoinId(Long.valueOf(user.getId()), coin.getId());

        if (existingAssetOptional.isPresent()) {
            Asset existingAsset = existingAssetOptional.get();
            double updatedQuantity = existingAsset.getQuantity() + quantityChange;
            existingAsset.setQuantity(updatedQuantity);
            return assetRepo.save(existingAsset);
        } else {
            Asset newAsset = new Asset();
            newAsset.setUser(user);
            newAsset.setCoin(coin);
            newAsset.setQuantity(quantityChange);
            return assetRepo.save(newAsset);
        }
    }
    @Override
    public Asset createAsset(User user, Coin coin, double quantity) {
        Asset newAsset = new Asset();
        newAsset.setUser(user);
        newAsset.setCoin(coin);
        newAsset.setQuantity(quantity);
        return assetRepo.save(newAsset);
    }

    @Override
    public Asset getAssetById(Long assetId) throws Exception {
        return assetRepo.findById(assetId)
                .orElseThrow(() -> new Exception("Asset not found with ID: " + assetId));
    }

    @Override
    public List<Asset> getUsersAssets(Long userId) {
        return List.of();
    }

    @Override
    public Asset findAssetByUserIdAndCoinId(Long userId, String coinId) {
        return assetRepo.findByUserIdAndCoinId(userId, coinId)
                .orElse(null);
    }

    @Override
    public void deleteAsset(Long assetId) {
        assetRepo.deleteById(assetId);
    }
}