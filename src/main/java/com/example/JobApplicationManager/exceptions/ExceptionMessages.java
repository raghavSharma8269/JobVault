package com.example.JobApplicationManager.exceptions;

import lombok.Getter;

//messages for all exceptions

@Getter
public enum ExceptionMessages {

    EMAIL_REQUIRED("Email is required"),
    PASSWORD_REQUIRED("Password is required"),
    FULL_NAME_REQUIRED("Name is required"),
    EMAIL_IS_ALREADY_IN_USE("This email is already in use"),
    EMAIL_NOT_FOUND("Could not email"),
    INVALID_JWT("Invalid JWT is being used"),
    JOB_TITLE_REQUIRED("Job TITLE is Required"),
    JOB_COMPANY_REQUIRED("Job COMPANY is Required"),
    JOB_DESCRIPTION_REQUIRED("Job DESCRIPTION is Required"),
    JOB_URL_REQUIRED("Job URL is Required"),
    USER_IS_REQUIRED_WITH_JOB("A user must be associated with a new job"),
    RESUME_MUST_BE_PDF("The resume file mut be a PDF"),
    JOB_DOES_NOT_EXIST("Job does not exist"),
    NOT_AUTHORIZED_TO_DELETE_JOB("You are not authorized to delete this job"),
    NOT_AUTHORIZED_TO_EDIT_JOB("You are not authorized to edit this job"),
    RESUME_MISSING("You have not uploaded a resume file"),
    OPEN_AI_API_IS_DOWN("Open AI API is down"),
    COVER_LETTER_MUST_BE_PDF("The resume file mut be a PDF"),
    COVER_LETTER_MISSING("You have not uploaded a cover letter file"),
    NOT_AUTHORIZED_TO_DELETE_USER("You are not authorized to delete this user"),
    PASSWORD_MISMATCH("Passwords do not match"),
    ORIGINAL_PASSWORD_IS_WRONG("Original password is incorrect"),
    EMAIL_VERIFICATION_FAILED("Email verification failed"),
    EMAIL_NOT_VERIFIED("Email is not verified");

    private final String message;
    ExceptionMessages(String message) {
        this.message = message;
    }
}

