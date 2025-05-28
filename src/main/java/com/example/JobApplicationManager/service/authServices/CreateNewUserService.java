package com.example.JobApplicationManager.service.authServices;

import com.example.JobApplicationManager.Command;
import com.example.JobApplicationManager.exceptions.EmailNotValidException;
import com.example.JobApplicationManager.exceptions.ExceptionMessages;
import com.example.JobApplicationManager.exceptions.validator.UserValidator;
import com.example.JobApplicationManager.model.entity.CustomUser;
import com.example.JobApplicationManager.model.repositories.UserRepository;
import com.example.JobApplicationManager.security.Authority;
import com.example.JobApplicationManager.service.emailVerification.EmailServiceImpl;
import com.example.JobApplicationManager.service.emailVerification.EmailVerificationTokenGenerator;
import jakarta.mail.MessagingException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CreateNewUserService implements Command<CustomUser, String> {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailVerificationTokenGenerator emailVerificationTokenGenerator;
    private final EmailServiceImpl emailService;
    private final Logger logger = LoggerFactory.getLogger(CreateNewUserService.class);

    public CreateNewUserService(UserRepository userRepository,
                                PasswordEncoder passwordEncoder,
                                EmailVerificationTokenGenerator emailVerificationTokenGenerator,
                                EmailServiceImpl emailService)
    {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailVerificationTokenGenerator = emailVerificationTokenGenerator;
        this.emailService = emailService;
    }

    @Override
    public ResponseEntity<String> execute(CustomUser customUser) throws MessagingException {

        //logging class
        logger.info("Executing " + getClass() + " input " + customUser);

        UserValidator.execute(customUser);

        Optional<CustomUser> userOptional = userRepository.findById(customUser.getEmail());


        if (userOptional.isEmpty()){
            //set default values for new user
            customUser.setAuthority(Authority.USER);
            customUser.setEmailVerificationToken(emailVerificationTokenGenerator.execute());
            customUser.setNumOfAiRequests(0);
            customUser.setEmailVerified(false);


            //saving new user to repo
            userRepository.save(new CustomUser(
                    customUser.getEmail(),

                    passwordEncoder.encode(                     //encoding password
                            customUser.getPassword()),
                    customUser.getFullName(),
                    customUser.getResume(),
                    customUser.getResumeFileName(),
                    customUser.getCoverLetter(),
                    customUser.getCoverLetterFileName(),
                    customUser.getAuthority(),
                    customUser.getAuthToken(),
                    customUser.getNumOfAiRequests(),
                    customUser.isEmailVerified(),
                    customUser.getEmailVerificationToken()
            ));

            emailService.sendSimpleMessage(customUser.getEmail(), "JobVault Email Verification",
                    "Click the link below to verify your email\n" +
                            "https://jobvault-production.up.railway.app/api/auth/verify?emailVerificationToken="+customUser.getEmailVerificationToken()+
                            "\n**Do not reply to this email**\n");

            return ResponseEntity.status(HttpStatus.CREATED).body("User Created Successfully");
        }

        //email not unique so exception thrown
      throw new EmailNotValidException(ExceptionMessages.EMAIL_IS_ALREADY_IN_USE.getMessage());
    }
}
