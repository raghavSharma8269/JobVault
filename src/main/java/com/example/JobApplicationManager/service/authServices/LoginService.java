package com.example.JobApplicationManager.service.authServices;

import com.example.JobApplicationManager.exceptions.EmailVerificationException;
import com.example.JobApplicationManager.exceptions.ExceptionMessages;
import com.example.JobApplicationManager.model.entity.CustomUser;
import com.example.JobApplicationManager.model.repositories.UserRepository;
import com.example.JobApplicationManager.security.JwtUtil;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import javax.security.auth.login.LoginException;

@Service
public class LoginService {
    private final AuthenticationManager manager;
    private final UserRepository userRepository;
    private final Logger logger = LoggerFactory.getLogger(LoginService.class);

    public LoginService(AuthenticationManager manager, UserRepository userRepository) {
        this.manager = manager;
        this.userRepository = userRepository;
    }

    public String authenticateAndGenerateToken(CustomUser userInput) {
        logger.info("Authenticating " + userInput.getEmail());

        try {
            CustomUser userFromDb = userRepository.findById(userInput.getEmail())
                    .orElseThrow(() -> new EntityNotFoundException(ExceptionMessages.EMAIL_NOT_FOUND.getMessage()));

//            if (!userFromDb.isEmailVerified()) {
//                throw new EmailVerificationException(ExceptionMessages.EMAIL_NOT_VERIFIED.getMessage());
//            }

            Authentication authentication = manager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            userInput.getEmail(),
                            userInput.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication\);

            String jwt = JwtUtil.generateToken((User) authentication.getPrincipal());

            userFromDb.setAuthToken(jwt);
            userRepository.save(userFromDb);

            return jwt;
        }catch (Exception e){
            throw new RuntimeException("Username or password is incorrect");
        }
    }

}