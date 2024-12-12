package com.fieldtraining.data.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fieldtraining.data.entity.CollegeManager;

public interface CollegeManagerRepository  extends JpaRepository<CollegeManager, Long>{
	
	Optional<CollegeManager> findById(Long id);

}