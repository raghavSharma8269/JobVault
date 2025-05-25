package com.example.JobApplicationManager.service.contactService;

import com.example.JobApplicationManager.exceptions.validator.ContactEmailValidation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private final Logger logger = LoggerFactory.getLogger(ContactService.class);
    private final JavaMailSender javaMailSender;

    public ContactService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public ResponseEntity<String> execute(String name, String email, String message) {

        logger.info("Received contact request from: " + name + " with email: " + email);

        // Validate input
        ContactEmailValidation.execute(name, email, message);

        try {
            SimpleMailMessage contactMessage = new SimpleMailMessage();

            contactMessage.setTo("raghavs2023@gmail.com");
            contactMessage.setFrom("noreply@jobvault.com");
            contactMessage.setReplyTo(email);

            contactMessage.setSubject("JobVault | Contact Request from " + name);
            contactMessage.setText("Sender: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message);

            javaMailSender.send(contactMessage);

            return ResponseEntity.ok("Email Sent Successfully");
        } catch (Exception e) {
            logger.error("Failed to send contact email: " + e.getMessage());
            return ResponseEntity.status(500).body(
                    "Failed to send email. Please manually email raghavs2023@gmail.com or try again later."
            );
        }
    }
}
