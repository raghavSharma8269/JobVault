package com.example.JobApplicationManager;

import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class JobApplicationManagerApplication {

	private final Logger logger = LoggerFactory.getLogger(JobApplicationManagerApplication.class);

	public static void main(String[] args) {
		System.out.println("Starting Application....");
		SpringApplication.run(JobApplicationManagerApplication.class, args);
	}

	// This method logs memory usage info
	@PostConstruct
	public void logMemorySettings() {
		Runtime runtime = Runtime.getRuntime();
		long maxMemory = runtime.maxMemory() / 1024 / 1024;
		long totalMemory = runtime.totalMemory() / 1024 / 1024;
		long freeMemory = runtime.freeMemory() / 1024 / 1024;
		long usedMemory = totalMemory - freeMemory;

		System.out.println("=== JVM Memory Settings ===");
		logger.info("Max memory (ceiling): {}MB", maxMemory);
		logger.info("Total memory (current allocation): {}MB", totalMemory);
		logger.info("Used memory (actually in use): {}MB", usedMemory);
		logger.info("Free memory (available): {}MB", freeMemory);
		System.out.println("==========================");
	}

}
