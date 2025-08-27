package com.CryptoMela.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

@Service
public class EmailSendService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String otp, String email) {
        String sub = "Your OTP is: " + otp + ", \n\n Kindly use this for 2 Step Authentication";

        SimpleMailMessage mess = new SimpleMailMessage();
        mess.setFrom("himanshu1july2003@gmail.com");
        mess.setTo(email);
        mess.setSubject("CryptoMela: 2-Step-Auth");
        mess.setText(sub);

        mailSender.send(mess);
    }
}
