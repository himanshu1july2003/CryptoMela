package com.CryptoMela.Repository;

import com.CryptoMela.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    User findByEmail(String email);
    boolean existsByEmail(String email);

    @Transactional
    void deleteByEmail(String email); // This will delete all rows matching the email
}
