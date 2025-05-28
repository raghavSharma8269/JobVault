package com.example.JobApplicationManager.service.emailVerification;

import com.example.JobApplicationManager.model.entity.CustomUser;
import com.example.JobApplicationManager.model.repositories.UserRepository;
import com.example.JobApplicationManager.service.OptionalCustomUserToCustomUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ResendEmailVerificationService {
    private final EmailServiceImpl emailService;
    private final EmailVerificationTokenGenerator emailVerificationTokenGenerator;
    private final UserRepository userRepository;
    private final OptionalCustomUserToCustomUserService optionalCustomUserToCustomUserService;
    private final Logger logger = LoggerFactory.getLogger(ResendEmailVerificationService.class);

    public ResendEmailVerificationService(EmailServiceImpl emailService, EmailVerificationTokenGenerator emailVerificationTokenGenerator, UserRepository userRepository, OptionalCustomUserToCustomUserService optionalCustomUserToCustomUserService) {
        this.emailService = emailService;
        this.emailVerificationTokenGenerator = emailVerificationTokenGenerator;
        this.userRepository = userRepository;
        this.optionalCustomUserToCustomUserService = optionalCustomUserToCustomUserService;
    }

    public ResponseEntity<String> execute(String email){
        logger.info("Executing " + getClass() + " || input: " + email);

        CustomUser user = optionalCustomUserToCustomUserService.execute(email);

        if(!user.isEmailVerified()){
            user.setEmailVerificationToken(emailVerificationTokenGenerator.execute());
            userRepository.save(user);
            emailService.sendSimpleMessage(user.getEmail(), "JobVault Email Verification",
                    "Click the link below to verify your email\n" +
                            "https://jobvault-production.up.railway.app/api/auth/verify?emailVerificationToken="+user.getEmailVerificationToken()+
                            "\n**Do not reply to this email**\n");

            return ResponseEntity.ok("Email verification link resent to " + user.getEmail());
        }
        else {
            logger.warn("User with email " + email + " is already verified");
            return ResponseEntity.badRequest().body("Email is already verified");
        }


    }

}
