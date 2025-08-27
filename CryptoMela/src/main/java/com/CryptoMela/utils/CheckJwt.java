package com.CryptoMela.utils;

public class CheckJwt {
    public static String checkJwt(String authHeader)
    {
        String token = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : authHeader;
        return  token;
    }
}
