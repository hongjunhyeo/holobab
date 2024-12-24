package com.fieldtraining.data.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fieldtraining.data.entity.Professor;
import com.fieldtraining.data.entity.User;

public interface ProfessorRepository  extends JpaRepository<Professor, Long>{
	
	List<Professor> findByUser(User user);
	
	Optional<Professor> findById(Long id);

	Optional<Professor> findByNameAndEmail(String name, String email);
	
	
	@Query("SELECT p FROM Professor p WHERE p.department LIKE %:department%")
	List<Professor> findByDepartment(@Param("department") String department);
	   
	@Query("SELECT p.user FROM Professor p WHERE p.email = :email AND p.user.userId = :userId")
	Optional<Professor> findUserByEmailAndUserId(@Param("email") String email, @Param("userId") String userId);
}
