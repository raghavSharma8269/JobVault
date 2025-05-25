package com.example.JobApplicationManager.controller;

import com.example.JobApplicationManager.model.entity.CustomUser;
import com.example.JobApplicationManager.service.authServices.CreateNewUserService;
import com.example.JobApplicationManager.service.authServices.LoginService;
import com.example.JobApplicationManager.service.emailVerification.VerifyAccountService;
import com.example.JobApplicationManager.service.userServices.GetUserService;
import jakarta.mail.MessagingException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
public class UserController {

private final CreateNewUserService createNewUserService;
private final LoginService loginService;
private final VerifyAccountService verifyAccountService;
private final GetUserService getUserService;

    public UserController(
            CreateNewUserService createNewUserService,
            LoginService loginService, VerifyAccountService verifyAccountService,
            GetUserService getUserService
    ) {
        this.createNewUserService = createNewUserService;
        this.loginService = loginService;
        this.verifyAccountService = verifyAccountService;
        this.getUserService = getUserService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> createNewUser(@RequestBody CustomUser customUser) throws MessagingException {
        return createNewUserService.execute(customUser);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody CustomUser user) {
        return loginService.authenticateAndGenerateToken(user);
    }


    @GetMapping("/verify")
    public ResponseEntity<Void> verify(@RequestParam String emailVerificationToken) {
        return verifyAccountService.execute(emailVerificationToken);
    }

    @GetMapping("/user")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<CustomUser> getUser() {
        return getUserService.execute();
    }

}
