package com.CryptoMela.Service;

import com.CryptoMela.Entity.*;
import com.CryptoMela.domain.OrderType;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderService {
    Order createOrder(User user, OrderItem orderItem, OrderType orderType);

  //   Asset updateAsset(User user, Coin coin, double newQuantity);
    Order getOrderByID(Long orderID) throws Exception;

    List<Order> getAllOrdersOfUser(Long userId, OrderType orderType, String assetSymbol);

    Order processOrder(Coin coin, double quantity, OrderType orderType, User user) throws Exception;

}
