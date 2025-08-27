package com.CryptoMela.Controller;

import com.CryptoMela.Entity.Asset;
import com.CryptoMela.Entity.User;
import com.CryptoMela.Service.AssetService;
import com.CryptoMela.Service.UserService;
import com.CryptoMela.utils.CheckJwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/assets")
public class AssetController {

    @Autowired
    private AssetService assetService;
    @Autowired
    private UserService userService;
    @GetMapping("/{assetId}")
    public ResponseEntity<Asset> getAssetById(@PathVariable Long assetId) throws Exception {
        Asset asset = assetService.getAssetById(assetId);
        return ResponseEntity.ok().body(asset);
    }

    @GetMapping("/coin/{coinId}/user")
    public ResponseEntity<Asset> getAssetByUserIdAndCoinId(
            @PathVariable String coinId,
            @RequestHeader("Authorization") String token)
            throws Exception {
        String jwt= CheckJwt.checkJwt(token);
        User user = userService.findUserProfileByJwt(jwt);
        Asset asset = assetService.findAssetByUserIdAndCoinId((long) user.getId(), coinId);
        return ResponseEntity.ok().body(asset);
    }
    @GetMapping("")
    public ResponseEntity<List<Asset>> getAssetsForUser(
            @RequestHeader("Authorization") String token)
            throws Exception {
        String jwt= CheckJwt.checkJwt(token);
        User user = userService.findUserProfileByJwt(jwt);
        List<Asset> assets = assetService.getUsersAssets((long) user.getId());
        return ResponseEntity.ok().body(assets);
    }
}
