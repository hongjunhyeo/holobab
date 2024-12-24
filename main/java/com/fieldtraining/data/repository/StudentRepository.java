package com.fieldtraining.data.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fieldtraining.data.entity.Student;

public interface StudentRepository  extends JpaRepository<Student, Long>{
   
   Student getByUserId(Long studentId);
   
   @Query("SELECT s FROM Student s WHERE s.department LIKE %:department%")
   List<Student> findByDepartment(@Param("department") String department);
   
   Optional<Student> findById(Long id);

   List<Student> findAll();  // 전체 학생 목록을 반환
   
   Optional<Student> findByNameAndEmail(String name, String email);

   @Query("SELECT s.id FROM Student s WHERE s.email = ?1 AND s.user.userId = ?2")
   Optional<Long> findIdByEmailAndUserId(String email, String userId);
}
