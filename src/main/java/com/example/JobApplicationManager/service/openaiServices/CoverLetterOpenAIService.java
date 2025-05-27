package com.example.JobApplicationManager.service.openaiServices;

import com.example.JobApplicationManager.exceptions.ExceptionMessages;
import com.example.JobApplicationManager.exceptions.ExternalApiServiceDownException;
import com.example.JobApplicationManager.exceptions.JobDoesNotExistException;
import com.example.JobApplicationManager.model.entity.CustomUser;
import com.example.JobApplicationManager.model.entity.JobsList;
import com.example.JobApplicationManager.model.repositories.JobsRepository;
import com.example.JobApplicationManager.model.repositories.UserRepository;
import com.example.JobApplicationManager.security.Authority;
import com.example.JobApplicationManager.service.OptionalCustomUserToCustomUserService;
import com.example.JobApplicationManager.service.resumeServices.CoverLetterScannerService;
import com.example.JobApplicationManager.service.resumeServices.ResumeScannerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CoverLetterOpenAIService {

    @Value("${openai.api.key}")
    String apiKey;

    private final RestTemplate restTemplate;
    private final JobsRepository jobsRepository;
    private final ResumeScannerService resumeScannerService;
    private final CoverLetterScannerService coverLetterScannerService;
    private final OptionalCustomUserToCustomUserService optionalCustomUserToCustomUserService;
    private final UserRepository userRepository;
    private final Logger logger = LoggerFactory.getLogger(CoverLetterOpenAIService.class);

    public CoverLetterOpenAIService(RestTemplate restTemplate,
                                    JobsRepository jobsRepository,
                                    ResumeScannerService resumeScannerService,
                                    CoverLetterScannerService coverLetterScannerService,
                                    OptionalCustomUserToCustomUserService optionalCustomUserToCustomUserService,
                                    UserRepository userRepository) {
        this.restTemplate = restTemplate;
        this.jobsRepository = jobsRepository;
        this.resumeScannerService = resumeScannerService;
        this.coverLetterScannerService = coverLetterScannerService;
        this.optionalCustomUserToCustomUserService = optionalCustomUserToCustomUserService;
        this.userRepository = userRepository;
    }

    public String analyzeCoverLetter(String jobId) throws IOException {
        logger.info("Executing " + getClass() + " || input: " + jobId);

        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = userDetails.getUsername();
        CustomUser user = optionalCustomUserToCustomUserService.execute(email);

        JobsList job = jobsRepository.findById(jobId)
                .orElseThrow(() -> new JobDoesNotExistException(ExceptionMessages.JOB_DOES_NOT_EXIST.getMessage()));

        // if user is an admin, no need to check the number of requests
        if (user.getAuthority() == Authority.ADMIN) {

            String response = callToOpenAiApi(
                    resumeScannerService.execute(),
                    job.getJobDescription(),
                    job.getJobTitle(),
                    job.getCompanyName(),
                    coverLetterScannerService.execute());

            job.setCvFeedback(response);
            jobsRepository.save(job);

            return response;
        }

        if (user.getNumOfAiRequests() >= 8) {
            return "You have no more AI requests left.";
        }

        String response = callToOpenAiApi(
                resumeScannerService.execute(),
                job.getJobDescription(),
                job.getJobTitle(),
                job.getCompanyName(),
                coverLetterScannerService.execute());

        job.setCvFeedback(response);
        jobsRepository.save(job);

        user.setNumOfAiRequests(user.getNumOfAiRequests() + 1);
        userRepository.save(user);

        return response + "\n\n You have " + (8 - user.getNumOfAiRequests()) + " AI requests left.";
    }


    private String callToOpenAiApi(String resume, String jobDescription, String jobTitle, String companyName, String coverLetter) {
        logger.info("Executing " + getClass() + " Job Title: " + jobTitle + " || Company Name: " + companyName);

        String prompt =
                "You are a senior career coach and expert cover letter writer helping a job candidate tailor a compelling and effective cover letter for a specific job. Use the following inputs:\n" +
                        "\n" +
                        "- Resume:\n" +
                        "{resume}\n" +
                        "\n" +
                        "- Job Title:\n" +
                        "{jobTitle}\n" +
                        "\n" +
                        "- Job Description:\n" +
                        "{jobDescription}\n" +
                        "\n" +
                        "- Company Name:\n" +
                        "{companyName}\n" +
                        "\n" +
                        "- Existing Cover Letter (if any):\n" +
                        "{coverLetter}\n" +
                        "\n" +
                        "Follow the structure below exactly. Do not skip or reword this format. The entire cover letter must follow this layout and tone:\n" +
                        "\n" +
                        "Dear (contact),\n" +
                        "\n" +
                        "(Brief sentence introducing yourself). (How you found out about the position). (Overview of why you're interested and how you can contribute).\n" +
                        "\n" +
                        "(1–2 paragraphs of relevant background information from the resume and projects. Frame this as a narrative that explains what led the candidate to this point and why this role is the natural next step. Mention relevant coursework only if it directly supports the job.)\n" +
                        "\n" +
                        "(Briefly reinforce your interest in the company or role). (Briefly restate why you’re a good fit for the position). (Politely encourage a response or mention when you will follow up.)\n" +
                        "\n" +
                        "Kind regards,\n" +
                        "\n" +
                        "(Self)\n" +
                        "\n" +
                        "Formatting:\n" +
                        "- Output only the final cover letter — no explanation or commentary.\n" +
                        "- Use clear, professional language.\n" +
                        "- Do not include markdown, bullet points, or code blocks.\n" +
                        "- Do not invent skills or experience not in the resume.\n" +
                        "\n" +
                        "Output:\n" +
                        "Return the completed, tailored cover letter as HTML code. Use proper formatting with HTML tags (e.g. <p> for paragraphs, <br> where needed). Do not include markdown, plain text, or code blocks. Return only the HTML.\n";


        List<Map<String, String>> messages = new ArrayList<>();
        Map<String, String> systemMessage = new HashMap<>();
        systemMessage.put("role", "system");
        systemMessage.put("content", "You are an assistant that helps users improve resumes for job applications.");
        messages.add(systemMessage);

        Map<String, String> userMessage = new HashMap<>();
        userMessage.put("role", "user");
        userMessage.put("content", prompt);
        messages.add(userMessage);

        // Prepare request body
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-4");
        requestBody.put("messages", messages);
        requestBody.put("temperature", 0.5);

        // Set up HTTP headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);

        // Send the request
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
        String openAiUrl = "https://api.openai.com/v1/chat/completions";
        ResponseEntity<Map> response = restTemplate.exchange(openAiUrl, HttpMethod.POST, request, Map.class);

        // Extract the improved resume text from the OpenAI response
        Map<String, Object> responseBody = response.getBody();
        if (responseBody != null && responseBody.containsKey("choices")) {
            // Extract the generated message content from the response
            List<Map<String, Object>> choices = (List<Map<String, Object>>) responseBody.get("choices");
            if (!choices.isEmpty()) {
                Map<String, Object> choice = choices.get(0);
                Map<String, String> message = (Map<String, String>) choice.get("message");
                return message.get("content");  // Return the response content
            }
        }

        throw new ExternalApiServiceDownException(ExceptionMessages.OPEN_AI_API_IS_DOWN.getMessage());
    }


}
