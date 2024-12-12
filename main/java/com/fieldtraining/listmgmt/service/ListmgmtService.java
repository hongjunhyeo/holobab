package com.fieldtraining.listmgmt.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.fieldtraining.data.entity.Professor;
import com.fieldtraining.data.entity.Student;
import com.fieldtraining.data.entity.Teacher;
import com.fieldtraining.data.entity.User;
import com.fieldtraining.data.repository.ProfessorRepository;
import com.fieldtraining.data.repository.StudentRepository;
import com.fieldtraining.data.repository.TeacherRepository;
import com.fieldtraining.listmgmt.dto.ProfessorDto;
import com.fieldtraining.listmgmt.dto.StudentDto;
import com.fieldtraining.listmgmt.dto.TeacherDto;
import com.fieldtraining.listmgmt.repository.ListmgmtRepository;
import com.fieldtraining.matching.entity.Match;
import com.fieldtraining.matching.repository.MatchRepository;

@Service
public class ListmgmtService {
	
	private final ListmgmtRepository listmgmtRepository;
	
	private final StudentRepository studentRepository;
	
	private final TeacherRepository teacherRepository;
	
	private final MatchRepository matchRepository;
	
	private final ProfessorRepository professorRepository;
	
	public ListmgmtService(ListmgmtRepository listmgmtRepository, StudentRepository studentRepository,
			TeacherRepository teacherRepository, MatchRepository matchRepository,
			ProfessorRepository professorRepository) {
		this.listmgmtRepository = listmgmtRepository;
		this.studentRepository = studentRepository;
		this.teacherRepository = teacherRepository;
		this.matchRepository = matchRepository;
		this.professorRepository = professorRepository;
	}
	
	public List<User> getAllUsers() {
        return listmgmtRepository.findAll();
    }
	
	// 실습생 목록 가져오기 (StudentDto로 변환)
    public List<StudentDto> getStudents() {
        List<User> users = listmgmtRepository.findStudents();
        return users.stream()
                .filter(user -> user.getStudentDetail() != null)
                .map(user -> {
                    Student student = user.getStudentDetail();
                    return new StudentDto(
                        student.getName(),
                        student.getCollege(),
                        student.getDepartment(),
                        student.getEmail(),
                        student.getSubject(),
                        student.getPhoneNumber()
                    );
                })
                .collect(Collectors.toList());
    }
    
    // 교사 목록 가져오기 (TeacherDto로 변환)
    public List<TeacherDto> getTeachers() {
        List<User> users = listmgmtRepository.findTeachers();
        return users.stream()
                .filter(user -> user.getTeacherDetail() != null)
                .map(user -> {
                    Teacher teacher = user.getTeacherDetail();
                    return new TeacherDto(
                    		teacher.getName(),
                    		teacher.getEmail(),
                    		teacher.getSchoolName(),
                    		teacher.getSubject()
                    );
                })
                .collect(Collectors.toList());
    }
    
    //학과로 학생 검색
    public List<StudentDto> searchByDepartmentStudent(String department) {
    	List<Student> students = studentRepository.findByDepartment(department);
    	
    	return students.stream()
    			.map(student -> StudentDto.builder()
    			        .name(student.getName())
    			        .college(student.getCollege())
    			        .department(student.getDepartment())
    			        .email(student.getEmail())
    			        .subject(student.getSubject())
    			        .build())
    			    .collect(Collectors.toList());
    }
    
    //교과로 교사 검색
    public List<TeacherDto> searchBySubject(String subject){
    	List<Teacher> teachers = teacherRepository.findBySubject(subject);
    	
    	return teachers.stream()
    			.map(teacher -> TeacherDto.builder()
    					.name(teacher.getName())
    					.email(teacher.getEmail())
    					.schoolName(teacher.getSchoolName())
    					.subject(teacher.getSubject())
    					.build())
    			.collect(Collectors.toList());
    }
    
    //교과로 교수 검색
    public List<ProfessorDto> searchByDepartmentProfessor(String department){
    	List<Professor> professors = professorRepository.findByDepartment(department);
    	
    	return professors.stream()
    			.map(professor -> ProfessorDto.builder()
    					.name(professor.getName())
    					.college(professor.getCollege())
    					.department(professor.getDepartment())
    					.email(professor.getEmail())
    					.phoneNumber(professor.getPhoneNumber())
    					.build())
    			.collect(Collectors.toList());
    }
 
    // 특정 학생에 매칭된 교사 조회
    public List<TeacherDto> getTeachersForStudent(Long studentId) {
        List<Match> approvedMatches = matchRepository.findApprovedMatchesByStudentId(studentId);

        return approvedMatches.stream()
            .map(Match::getTeacher)
            .map(teacher -> TeacherDto.builder()
                .name(teacher.getName())
                .email(teacher.getEmail())
                .schoolName(teacher.getSchoolName())
                .subject(teacher.getSubject())
                .build())
            .collect(Collectors.toList());
    }
}
