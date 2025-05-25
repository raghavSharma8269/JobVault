package com.example.JobApplicationManager.controller;

import com.example.JobApplicationManager.model.DTOs.ContactMessageDTO;
import com.example.JobApplicationManager.service.contactService.ContactService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping()
    public ResponseEntity<String> sendContactMessage(
            @RequestBody ContactMessageDTO contactMessageDTO) {
        return contactService.execute(contactMessageDTO.getName(), contactMessageDTO.getEmail(), contactMessageDTO.getMessage());
    }
}
