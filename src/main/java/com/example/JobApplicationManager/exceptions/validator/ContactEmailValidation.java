package com.example.JobApplicationManager.exceptions.validator;


public class ContactEmailValidation {

    public static void execute(String name, String email, String message){

        if (name == null || name.isEmpty()) {
            throw new RuntimeException("Name cannot be empty");
        }

        if (email == null || email.isEmpty()) {
            throw new RuntimeException("Email cannot be empty");
        }

        if (message == null || message.isEmpty()) {
            throw new RuntimeException("Message cannot be empty");
        }
    }

}
