package com.example.JobApplicationManager.model.repositories;

import com.example.JobApplicationManager.model.entity.JobsList;
import com.example.JobApplicationManager.service.jobsServices.ApplicationStatus;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobsRepository extends JpaRepository<JobsList, String> { //String is datatype of primary key

    // finds job via custom user
    @Query("SELECT query FROM JobsList query WHERE query.customUser.email = :email")
    List<JobsList> findByCustomUser(@Param("email") String email);


    @Query("SELECT query FROM JobsList query WHERE query.customUser.email = :email " +
            "AND (:keyword IS NULL OR :keyword = '' " +
            "OR LOWER(query.jobTitle) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(query.companyName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(query.jobDescription) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "AND (:status IS NULL OR query.applicationStatus = :status)")
    List<JobsList> search(
            @Param("email") String email,
            @Param("keyword") String keyword,
            @Param("status") ApplicationStatus status,
            Sort sort
    );

}
