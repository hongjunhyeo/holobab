package com.fieldtraining.matching.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fieldtraining.PracticeBoard.entity.PracticeBoard;
import com.fieldtraining.data.entity.Student;
import com.fieldtraining.data.entity.Teacher;
import com.fieldtraining.matching.entity.Match;
import com.fieldtraining.matching.entity.MatchStatus;

public interface MatchRepository extends JpaRepository<Match, Long> {

	// 선생님이 승인 대기 중인 매칭 목록 조회
	List<Match> findByTeacherIdAndStatus(Long teacherId, MatchStatus status);



	void deleteById(Long id);

	@Query("SELECT m FROM Match m JOIN FETCH m.student JOIN FETCH m.teacher WHERE m.teacher.id = :teacherId AND m.matchApproved = false")
	List<Match> findByTeacherIdAndMatchApprovedFalse(@Param("teacherId") Long teacherId);

	// 학생 ID와 매칭 상태로 매칭을 조회
	Match findByStudentIdAndMatchApproved(Long studentId, boolean matchApproved);

	// 학생 ID와 매칭 상태로 매칭을 조회
	List<Match> findByStudentIdAndMatchApproved(Long studentId, Boolean matchApproved);

	// student 엔티티의 ID를 기준으로 매칭 승인 여부를 체크
	List<Match> findByStudent_IdAndMatchApproved(Long studentId, Boolean matchApproved);

	// 학생이 승인된 매칭이 있는지 확인하는 메서드
	boolean existsByStudentIdAndMatchApproved(Long studentId, boolean matchApproved);
	
	boolean existsByTeacherIdAndMatchApproved(Long teacherId, boolean matchApproved);

	List<Match> findByTeacherIdAndMatchApprovedTrue(Long teacherId);

	// 선생님 ID를 기준으로 매칭된 학생들을 찾는 메서드
	@Query("SELECT m.student FROM Match m WHERE m.teacher.id = :teacherId")
	List<Student> findStudentsByTeacherId(Long teacherId);
	
    Optional<Match> findByStudentIdAndTeacherId(Long studentId, Long teacherId);
    

    // studentId로 매칭된 Match를 찾는 메서드
    Match findByStudentId(Long studentId);

    // teacherId로 매칭된 Match를 찾는 메서드
    Match findByTeacherId(Long teacherId);
    
    // 학생 ID를 기준으로 매칭 리스트 조회
    @Query("SELECT m FROM Match m JOIN FETCH m.teacher WHERE m.student.id = :studentId AND m.matchApproved = true")
    List<Match> findApprovedMatchesByStudentId(@Param("studentId") Long studentId);

    // 학생 ID와 매칭 승인 여부로 매칭 리스트 조회
    @Query("SELECT m FROM Match m JOIN FETCH m.teacher WHERE m.student.id = :studentId AND m.matchApproved = true")
    List<Match> findApprovedMatchesForStudent(@Param("studentId") Long studentId);


    @Query("SELECT m.teacher FROM Match m WHERE m.student.id = :studentId")
	List<Teacher> findTeachersByStudentId(Long studentId);

//	// 교수: 속한 학교/학과의 학생 매칭 정보 조회
//	@Query("SELECT m FROM Match m WHERE m.writer.id IN " +
//			"(SELECT s.id FROM Student s WHERE s.college = :college AND s.department = :department)")
//	Page<PracticeBoard> findBoardsForProfessor(String college, String department, Pageable pageable);
}
