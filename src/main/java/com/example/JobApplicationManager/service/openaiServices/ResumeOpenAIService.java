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
public class ResumeOpenAIService {

    @Value("${openai.api.key}")
    String openAiApiKey;

    private final RestTemplate restTemplate;
    private final JobsRepository jobsRepository;
    private final ResumeScannerService resumeScannerService;
    private final OptionalCustomUserToCustomUserService optionalCustomUserToCustomUserService;
    private final UserRepository userRepository;
    private final Logger logger = LoggerFactory.getLogger(ResumeOpenAIService.class);

    public ResumeOpenAIService(RestTemplate restTemplate,
                               JobsRepository jobsRepository,
                               ResumeScannerService resumeScannerService,
                               OptionalCustomUserToCustomUserService optionalCustomUserToCustomUserService,
                               UserRepository userRepository
    ) {
        this.restTemplate = restTemplate;
        this.jobsRepository = jobsRepository;
        this.resumeScannerService = resumeScannerService;
        this.optionalCustomUserToCustomUserService = optionalCustomUserToCustomUserService;
        this.userRepository = userRepository;
    }

    public String analyzeResume(String jobId) throws IOException {
        logger.info("Executing " + getClass() + " || input: " + jobId);

        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = userDetails.getUsername();

        CustomUser user = optionalCustomUserToCustomUserService.execute(email);

        JobsList job = jobsRepository.findById(jobId)
                .orElseThrow(() -> new JobDoesNotExistException(ExceptionMessages.JOB_DOES_NOT_EXIST.getMessage()));

        if (user.getAuthority() == Authority.ADMIN) {

            String response = callToOpenAiApi(
                    resumeScannerService.execute(),
                    job.getJobDescription(),
                    job.getJobTitle(),
                    job.getCompanyName());

            job.setResumeFeedback(response);
            jobsRepository.save(job);

            return response;
        }

        if (user.getNumOfAiRequests() >= 8) {
            return "Reached Max AI Calls";
        }

        String response = callToOpenAiApi(
                resumeScannerService.execute(),
                job.getJobDescription(),
                job.getJobTitle(),
                job.getCompanyName());

        user.setNumOfAiRequests(user.getNumOfAiRequests() + 1);
        userRepository.save(user);

        job.setResumeFeedback(response);
        jobsRepository.save(job);

        return response + "\n\n You have " + (8 - user.getNumOfAiRequests()) + " AI requests left.";
    }


    private String callToOpenAiApi(String resume, String jobDescription, String jobTitle, String companyName) {
        logger.info("Executing " + getClass() + " Job Title: " + jobTitle + " || Company Name: " + companyName);

        String prompt =
                "You are an expert resume reviewer helping a job applicant tailor their resume for a specific role.\n\n" +
                        "Parameters:\n" +
                        "- Resume:\n" + resume + "\n" +
                        "- Job Title: " + jobTitle + "\n" +
                        "- Job Description:\n" + jobDescription + "\n" +
                        "- Company Name: " + companyName + "\n\n" +

                        "Your task is to improve the resume and give feedback in 4 structured steps. Your goal is to help the applicant avoid being rejected by AI resume scanners (ATS) by ensuring relevant keywords and phrasing from the job description are properly reflected in the resume. However, do not fabricate experience or skills that do not already exist in the resume (THIS INSTRUCTION IS THE MOST CRUCIAL).\n\n" +

                        "Return your full response as a formatted HTML code using <h4>, <ul>, <p>, and <strong> where appropriate. Return the full response as raw HTML. Do not use triple backticks or Markdown code blocks and add the step number in the same tag as the step name. " +

                        "Limit your total response to 500 words (DO NOT include any html in the word limit). Refer to the reader of the feedback as you. \n\n" +

                        "1. <h4>Key Interview Talking Points</h4>\n" +
                        "- Briefly highlight 2–3 bullet points from the resume that are most relevant to this specific role.\n" +
                        "- Show how they align with the job description or company mission.\n\n" +

                        "2. <h4>Specific Bullet Point Improvements (ATS Optimization)</h4>\n" +
                        "- Focus most of your effort here.\n" +
                        "- Identify bullet points that can be improved by inserting relevant job description keywords to improve ATS score.\n" +
                        "- For each, show:\n" +
                        "    • <strong>Original:</strong> [original bullet]\n" +
                        "    • <strong>Improved:</strong> [edited version with keywords]\n\n" +

                        "3. <h4>Missing Skills or Experience</h4>\n" +
                        "- List any critical job description skills or technologies missing from the resume.\n" +
                        "- Emphasize that the user should find ways to gain or mention them in future versions.\n" +
                        "- DO NOT make up skills or experience.\n\n" +

                        "4. <h4>Resume Fit Score</h4>\n" +
                        "- Give a score from 1–10 based on how well the resume fits the job.\n" +
                        "- Justify your score based on coverage of job description keywords, experience relevance, and technical fit.\n";

        List<Map<String, String>> messages = new ArrayList<>();
        Map<String, String> systemMessage = new HashMap<>();
        systemMessage.put("role", "system");
        systemMessage.put("content", "You are an assistant that helps users improve resumes for job applications.");
        messages.add(systemMessage);

        Map<String, String> userMessage = new HashMap<>();
        userMessage.put("role", "user");
        userMessage.put("content", prompt);
        messages.add(userMessage);

        // Prepare the request body
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-4-turbo");
        requestBody.put("messages", messages);
        requestBody.put("temperature", 0.5);

        // Set up HTTP headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + openAiApiKey);

        // Send the request
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
        String openAiUrl = "https://api.openai.com/v1/chat/completions";
        ResponseEntity<Map> response = restTemplate.exchange(openAiUrl, HttpMethod.POST, request, Map.class);

        // Extract the improved resume text from the OpenAI response
        Map<String, Object> responseBody = response.getBody();
        if (responseBody != null && responseBody.containsKey("choices")) {
            // Extract the generated message from the response
            List<Map<String, Object>> choices = (List<Map<String, Object>>) responseBody.get("choices");
            if (!choices.isEmpty()) {
                Map<String, Object> choice = choices.get(0);
                Map<String, String> message = (Map<String, String>) choice.get("message");
                return message.get("content");  // Return the response
            }
        }

        throw new ExternalApiServiceDownException(ExceptionMessages.OPEN_AI_API_IS_DOWN.getMessage());
    }


}
