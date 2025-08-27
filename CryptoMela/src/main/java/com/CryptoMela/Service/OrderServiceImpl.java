package com.CryptoMela.Service;

import com.CryptoMela.Entity.*;
import com.CryptoMela.Repository.AssetRepo;
import com.CryptoMela.Repository.OrderItemRepo;
import com.CryptoMela.Repository.OrderRepo;
import com.CryptoMela.domain.OrderType;
import com.CryptoMela.domain.Orderstatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepo orderRepo;
    @Autowired
    private AssetService assetService;
    @Autowired
    private OrderItemRepo orderItemRepo;
    @Autowired
    private WalletService walletService;

    @Override
    public Order createOrder(User user, OrderItem orderItem, OrderType orderType) {
        double price = orderItem.getCoin().getCurrentPrice() * orderItem.getQuantity();

        Order order = new Order();
        order.setUser(user);
        order.setOrderItem(orderItem);
        order.setOrderType(orderType);
        order.setPrice(BigDecimal.valueOf(price));
        order.setTimestamp(LocalDateTime.now());
        order.setStatus(Orderstatus.PENDING);

        return orderRepo.save(order);
    }

    @Override
    public Order getOrderByID(Long orderID) throws Exception {
        return orderRepo.findById(orderID)
                .orElseThrow(() -> new Exception("order not found"));
    }

    private OrderItem createOrderItem(Coin coin, double quantity, double buyPrice, double sellPrice) {
        OrderItem orderItem = new OrderItem();
        orderItem.setCoin(coin);
        orderItem.setQuantity(quantity);
        orderItem.setBuyPrice(buyPrice);
        orderItem.setSellPrice(sellPrice);
        return orderItemRepo.save(orderItem);
    }

    @Transactional
    public Order buyAsset(Coin coin, double quantity, User user) throws Exception {
        if (quantity <= 0) {
            throw new Exception("quantity should be > 0");
        }
        double buyPrice = coin.getCurrentPrice();
        OrderItem orderItem = createOrderItem(coin, quantity, buyPrice, 0);
        Order order = createOrder(user, orderItem, OrderType.BUY);
        orderItem.setOrder(order);
        walletService.payOrderAmount(order, user);
        order.setStatus(Orderstatus.SUCCESS);
        order.setOrderType(OrderType.BUY);
        Order savedOrder = orderRepo.save(order);

        // Fix: Use the new unified updateAsset method
        assetService.updateAsset(user, coin, orderItem.getQuantity());

        return savedOrder;
    }

    @Transactional
    public Order sellAsset(Coin coin, double quantity, User user) throws Exception {
        if (quantity <= 0) {
            throw new Exception("quantity should be > 0");
        }

        Asset assetToSell = assetService.findAssetByUserIdAndCoinId(
                (long) user.getId(),
                coin.getId()
        );

        if (assetToSell == null || assetToSell.getQuantity() < quantity) {
            throw new Exception("Insufficient quantity");
        }

        double sellPrice = coin.getCurrentPrice();
        double buyprice = assetToSell.getBuyPrice();
        OrderItem orderItem = createOrderItem(coin, quantity, buyprice, sellPrice);
        Order order = createOrder(user, orderItem, OrderType.SELL);
        orderItem.setOrder(order);

        order.setStatus(Orderstatus.SUCCESS);
        order.setOrderType(OrderType.SELL);
        Order savedOrder = orderRepo.save(order);
        walletService.payOrderAmount(order, user);

        // Fix: Use the new unified updateAsset method for selling
        Asset updatedAsset = assetService.updateAsset(user, coin, -quantity);

        if (updatedAsset.getQuantity() * coin.getCurrentPrice() <= 1) {
            assetService.deleteAsset(updatedAsset.getId());
        }
        return savedOrder;
    }

    @Override
    public List<Order> getAllOrdersOfUser(Long userId, OrderType orderType, String assetSymbol) {
        return orderRepo.findByUserId(userId);
    }

    @Transactional
    @Override
    public Order processOrder(Coin coin, double quantity, OrderType orderType, User user) throws Exception {
        if (orderType == OrderType.BUY) {
            return buyAsset(coin, quantity, user);
        } else if (orderType.equals(OrderType.SELL)) {
            return sellAsset(coin, quantity, user);
        }
        throw new Exception("Not Valid");
    }
}