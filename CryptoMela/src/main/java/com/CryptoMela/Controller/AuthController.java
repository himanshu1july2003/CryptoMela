package com.CryptoMela.Controller;

import com.CryptoMela.Entity.TwoFactorOTP;
import com.CryptoMela.Entity.User;
import com.CryptoMela.Entity.Watchlist;
import com.CryptoMela.Repository.TwoFactorOtpRepo;
import com.CryptoMela.Repository.UserRepo;
import com.CryptoMela.Repository.WatchlistRepo;
import com.CryptoMela.Service.EmailSendService;
import com.CryptoMela.Service.TwoFactorOtpService;
import com.CryptoMela.Service.UserService;
import com.CryptoMela.Service.WatchlistService;
import com.CryptoMela.domain.VerificationTpe;
import com.CryptoMela.utils.JwtUtil;
import com.CryptoMela.utils.OtpUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private TwoFactorOtpService OtpService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private TwoFactorOtpRepo OtpRepo;
    @Autowired
    private EmailSendService emailSendService;
    @Autowired
    private UserService userService;

    @Autowired
    private WatchlistService watchlistService;

    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody User user) {
        User newUser = new User();
        newUser.setMobileNumber(user.getMobileNumber());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(passwordEncoder.encode(user.getPassword())); // ✅ Hash here
        newUser.setFullName(user.getFullName());
        User savedUser = userRepo.save(newUser);
        return new ResponseEntity<>(savedUser, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getEmail(),
                            user.getPassword()
                    )
            );
            System.out.println("✅ Authentication success");
        } catch (Exception e) {
            System.out.println("❌ Authentication failed");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getEmail());
        String otp= OtpUtils.generateOTP();
        System.out.println(otp +"🔥🚀");
        emailSendService.sendEmail(otp,user.getEmail());
        TwoFactorOTP obj= OtpService.createTwoFactorOtp(otp,token,user.getEmail());

        return ResponseEntity.ok(obj);
    }

    @PostMapping("/verifyOtp")
    public ResponseEntity<?> verifyOTP(@RequestBody TwoFactorOTP otp) throws Exception {
        System.out.println("Received Email from request: " + otp.getEmail());

        TwoFactorOTP obj = OtpRepo.findByEmail(otp.getEmail());
        System.out.println("Object from DB: " + obj);

        if (obj == null) {
            return new ResponseEntity<>("Session not found or expired", HttpStatus.NOT_FOUND);
        }

        if (otp.getOtp().equals(obj.getOtp())) {
            User existingUser = userRepo.findByEmail(obj.getEmail());

            if (existingUser == null) {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }

            existingUser.getTwoFactorAuth().setEnabled(true);
            existingUser.getTwoFactorAuth().setSendTo(VerificationTpe.EMAIL);

            userRepo.save(existingUser);

            // Use a try-catch block to handle the potential "Watchlist Not found" exception
            try {
                watchlistService.findUserWatchlist((long) existingUser.getId());
            } catch (Exception e) {
                // If the watchlist is not found, create a new one
                watchlistService.createWatchlist(existingUser);
            }

            return new ResponseEntity<>(obj, HttpStatus.OK);
        }
        return new ResponseEntity<>("Wrong OTP", HttpStatus.UNAUTHORIZED);
    }
    @DeleteMapping("remove/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        try {
            if(!userRepo.existsById(id)){
                return new ResponseEntity<>("ID is invalid: " + id, HttpStatus.NOT_FOUND);
            }
            userRepo.deleteById(id);
            return new ResponseEntity<>("User Removed whose ID is: " + id, HttpStatus.OK);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>("ID is invalid: " + id, HttpStatus.NOT_FOUND);
        }
    }


}
