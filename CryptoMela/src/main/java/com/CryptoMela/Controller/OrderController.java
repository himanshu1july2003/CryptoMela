package com.CryptoMela.Controller;

import com.CryptoMela.Entity.Coin;
import com.CryptoMela.Entity.Order;
import com.CryptoMela.Entity.User;
import com.CryptoMela.Service.CoinService;
import com.CryptoMela.Service.OrderService;
import com.CryptoMela.Service.UserService;
import com.CryptoMela.domain.OrderType;
import com.CryptoMela.requests.CreateOrderRequest;
import com.CryptoMela.utils.CheckJwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    private CoinService coinService;
    @Autowired
    private OrderService orderService;
    @Autowired
    private UserService userService;
//    @Autowired
//    private
@PostMapping("/pay")
public ResponseEntity<Order> payOrderPayment(
        @RequestHeader("Authorization") String jwtt,
        @RequestBody CreateOrderRequest req)
        throws Exception {
    String jwt= CheckJwt.checkJwt(jwtt);
    User user = userService.findUserProfileByJwt(jwt);
    Coin coin = coinService.findById(req.getCoinId());
    Order order = orderService.processOrder(coin, req.getQuantity(), req.getOrderType(),user);
    return ResponseEntity.ok(order);
}
    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderByID(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long orderId)
            throws Exception {
        String jwtToken= CheckJwt.checkJwt(jwt);
        if (jwtToken == null) {
            throw new Exception("token missing...");
        }
        User user = userService.findUserProfileByJwt(jwtToken);
        Order order = orderService.getOrderByID(orderId);
        if (order.getUser().getId()==(user.getId())) {
            return ResponseEntity.ok(order);
        } else {
            throw new Exception("Not Access");
        }
    }
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrdersForUser(
            @RequestHeader("Authorization") String token,
            @RequestParam(required = false) OrderType order_type,
            @RequestParam(required = false) String asset_symbol)
            throws Exception {
    String jwt= CheckJwt.checkJwt(token);
        Long userId = (long) userService.findUserProfileByJwt(jwt).getId();
        List<Order> userOrders = orderService.getAllOrdersOfUser(userId, order_type, asset_symbol);
        return ResponseEntity.ok(userOrders);
    }
}
