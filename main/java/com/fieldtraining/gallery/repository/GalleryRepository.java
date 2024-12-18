package com.fieldtraining.gallery.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fieldtraining.data.entity.User;
import com.fieldtraining.gallery.entity.Gallery;

public interface GalleryRepository extends JpaRepository<Gallery, Long>{

	List<Gallery> findByWriterId(Long writerId);

	@Query("SELECT g FROM Gallery g WHERE g.writer IN " +
		       "(SELECT u FROM User u WHERE " +
		       "u.studentDetail.schoolName = :affiliation OR " +
		       "u.teacherDetail.schoolName = :affiliation OR " +
		       "u.professorDetail.college = :affiliation OR " +
		       "u.collegeManagerDetail.college = :affiliation OR " +
		       "u.schoolManagerDetail.schoolName = :affiliation)")
		List<Gallery> findByAffiliation(@Param("affiliation") String affiliation);


}
