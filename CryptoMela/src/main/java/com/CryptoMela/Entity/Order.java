package com.CryptoMela.Entity;

import com.CryptoMela.domain.OrderType;
import com.CryptoMela.domain.Orderstatus;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "orders") // Good practice to use a different table name
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id; // This is the correct primary key for the Order table

    @ManyToOne
    @JoinColumn(name = "user_id") // This is the foreign key linking to the User
    private User user;

    @Column(nullable = false)
    private OrderType orderType;
    private BigDecimal price;
    private LocalDateTime timestamp = LocalDateTime.now();

    @Column(nullable = false)
    private Orderstatus status;

    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL)
    private OrderItem orderItem;
}