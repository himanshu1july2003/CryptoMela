package com.CryptoMela.Service;

import com.CryptoMela.Entity.User;
import com.CryptoMela.Repository.UserRepo;
import com.CryptoMela.domain.VerificationTpe;
import com.CryptoMela.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepo repo;
    @Autowired
    private JwtUtil utils;
    public User findUserProfileByJwt(String jwt) throws Exception {
        String email= utils.extractEmail(jwt);
        User user=repo.findByEmail(email);
        if(user==null)
        {
            throw new Exception("User not found");
        }
        return user;
    }
    public User findByEmail(String email) throws Exception {
        User user=repo.findByEmail(email);
        if(user==null)
        {
            throw new Exception("User not found");
        }
        return user;
    }
    public User findById(Long id) throws Exception { // Correct the type to Long
        Optional<User> user = repo.findById(id);
        if(user.isEmpty())
        {
            throw new Exception("User not found");
        }
        return user.orElse(null);
    }
    public ResponseEntity<User> updatePassword(String email, String newPass)
    {
        User user=repo.findByEmail(email);
        User AuthUser=new User();
        AuthUser.setId(user.getId());
        AuthUser.getTwoFactorAuth().setEnabled(true);
        AuthUser.setRole(user.getRole());
        AuthUser.setFullName(user.getFullName());
        AuthUser.setPassword(newPass);
        AuthUser.setEmail(email);
        AuthUser.getTwoFactorAuth().setSendTo(VerificationTpe.EMAIL);
        AuthUser.setMobileNumber(user.getMobileNumber());
        repo.deleteByEmail(user.getEmail());
        repo.save(AuthUser);
        return new ResponseEntity<>(AuthUser, HttpStatus.OK);
    }
}
