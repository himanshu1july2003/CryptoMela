package com.CryptoMela.Controller;

import com.CryptoMela.Entity.TwoFactorOTP;
import com.CryptoMela.Entity.User;
import com.CryptoMela.Repository.TwoFactorOtpRepo;
import com.CryptoMela.Repository.UserRepo;
import com.CryptoMela.Service.EmailSendService;
import com.CryptoMela.Service.TwoFactorOtpService;
import com.CryptoMela.Service.UserService;
import com.CryptoMela.domain.VerificationTpe;
import com.CryptoMela.utils.JwtUtil;
import com.CryptoMela.utils.OtpUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private EmailSendService emailSendService;
    @Autowired
    private TwoFactorOtpService OtpService;
    @Autowired
    private UserRepo repo;
    @Autowired
    private UserService service;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private TwoFactorOtpRepo Otprepo;
    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String jwt) throws Exception {
        if (jwt.startsWith("Bearer ")) {
            jwt = jwt.substring(7); // "Bearer " hata ke sirf token bacha
        }
        User user = service.findUserProfileByJwt(jwt);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> ForgotPass(@RequestBody User user)
    {
        if(repo.existsByEmail(user.getEmail()))
        {
            String token = jwtUtil.generateToken(user.getEmail());
            String otp= OtpUtils.generateOTP();
            emailSendService.sendEmail(otp,user.getEmail());
            TwoFactorOTP obj= OtpService.createTwoFactorOtp(otp,token,user.getEmail());
            return ResponseEntity.ok(obj);

        }
        return new ResponseEntity<>("Invalid Email", HttpStatus.NOT_FOUND);
    }
    @PostMapping("/verifyOtp")
    public ResponseEntity<?> verifyOTP(@RequestBody TwoFactorOTP otp)
    {
        System.out.println("Received Email from request: " + otp.getEmail());

        TwoFactorOTP obj = Otprepo.findByEmail(otp.getEmail());
        System.out.println("Object from DB: " + obj);

        if(obj == null) {
            return new ResponseEntity<>("Session not found or expired", HttpStatus.NOT_FOUND);
        }

        if(otp.getOtp().equals(obj.getOtp())) {
            String res=obj.getJwt();
            User oldUser=repo.findByEmail(obj.getEmail());
            User AuthUser=new User();
            AuthUser.setId(oldUser.getId());
            AuthUser.getTwoFactorAuth().setEnabled(true);
            AuthUser.setRole(oldUser.getRole());
            AuthUser.setFullName(oldUser.getFullName());
            AuthUser.setPassword(oldUser.getPassword());
            AuthUser.setEmail(oldUser.getEmail());
            AuthUser.getTwoFactorAuth().setSendTo(VerificationTpe.EMAIL);
            AuthUser.setMobileNumber(oldUser.getMobileNumber());
            repo.save(AuthUser);
            return new ResponseEntity<>(obj, HttpStatus.OK);
        }
        return new ResponseEntity<>("Wrong OTP", HttpStatus.UNAUTHORIZED);
    }
}
