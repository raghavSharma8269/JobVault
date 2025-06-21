package com.example.JobApplicationManager.controller;

import com.example.JobApplicationManager.model.DTOs.UserDTO;
import com.example.JobApplicationManager.service.adminServices.DeleteUserViaAdminService;
import com.example.JobApplicationManager.service.adminServices.GetAllUsersService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final DeleteUserViaAdminService deleteUserViaAdminService;
    private final GetAllUsersService getAllUsersService;

    public AdminController(DeleteUserViaAdminService deleteUserViaAdminService,
                           GetAllUsersService getAllUsersService
    ) {
        this.deleteUserViaAdminService = deleteUserViaAdminService;
        this.getAllUsersService = getAllUsersService;
    }

    @DeleteMapping("/{email}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> deleteUser (@PathVariable String email) {
        return deleteUserViaAdminService.execute(email);
    }

    @GetMapping()
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return getAllUsersService.execute();
    }

    @GetMapping("/memory")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Map<String, Object> getMemoryInfo() {
        Runtime runtime = Runtime.getRuntime();
        long maxMemory = runtime.maxMemory() / 1024 / 1024;
        long totalMemory = runtime.totalMemory() / 1024 / 1024;
        long freeMemory = runtime.freeMemory() / 1024 / 1024;
        long usedMemory = totalMemory - freeMemory;

        Map<String, Object> memoryInfo = new HashMap<>();
        memoryInfo.put("max_memory_mb", maxMemory);
        memoryInfo.put("total_memory_mb", totalMemory);
        memoryInfo.put("used_memory_mb", usedMemory);
        memoryInfo.put("free_memory_mb", freeMemory);
        memoryInfo.put("memory_usage_percentage", Math.round((double) usedMemory / maxMemory * 100));

        return memoryInfo;
    }

}
