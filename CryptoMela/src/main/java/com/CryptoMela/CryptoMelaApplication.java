package com.CryptoMela;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
@EntityScan(basePackages = "com.CryptoMela.Entity")
public class CryptoMelaApplication {

	public static void main(String[] args) {
		SpringApplication.run(CryptoMelaApplication.class, args);
	}

}
