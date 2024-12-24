package com.fieldtraining.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fieldtraining.data.entity.CollegeManager;
import com.fieldtraining.data.entity.Professor;
import com.fieldtraining.data.entity.SchoolManager;
import com.fieldtraining.data.entity.Student;
import com.fieldtraining.data.entity.Teacher;
import com.fieldtraining.data.entity.User;
import com.fieldtraining.data.repository.CollegeManagerRepository;
import com.fieldtraining.data.repository.ProfessorRepository;
import com.fieldtraining.data.repository.SchoolManagerRepository;
import com.fieldtraining.data.repository.StudentRepository;
import com.fieldtraining.data.repository.TeacherRepository;
import com.fieldtraining.data.repository.UserRepository;
import com.fieldtraining.matching.dto.MatchResponseDto;
import com.fieldtraining.matching.dto.MatchedInfoDto;
import com.fieldtraining.matching.service.MatchingService;
import com.fieldtraining.service.impl.AdminService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	   private final UserRepository userRepository;
	   
	   @Autowired
	   private final StudentRepository studentRepository;
	   
	   @Autowired
	   private final TeacherRepository teacherRepository;
	   
	   @Autowired
	   private final ProfessorRepository professorRepository;
	   
	   @Autowired
	   private final CollegeManagerRepository collegeManagerRepository;
	   
	   @Autowired 
	   private final SchoolManagerRepository schoolManagerRepository;
	   
	   @Autowired
	    private final AdminService adminService;
	   
	   @Autowired
	   private final MatchingService matchingService;

	
	


	
	   


	public AdminController(UserRepository userRepository, StudentRepository studentRepository,
			TeacherRepository teacherRepository, ProfessorRepository professorRepository,
			CollegeManagerRepository collegeManagerRepository, SchoolManagerRepository schoolManagerRepository,
			AdminService adminService, MatchingService matchingService) {
		super();
		this.userRepository = userRepository;
		this.studentRepository = studentRepository;
		this.teacherRepository = teacherRepository;
		this.professorRepository = professorRepository;
		this.collegeManagerRepository = collegeManagerRepository;
		this.schoolManagerRepository = schoolManagerRepository;
		this.adminService = adminService;
		this.matchingService = matchingService;
	}

	@GetMapping("/users")
	public ResponseEntity<List<User>> getAllUsers() {
	    List<User> users = userRepository.findAll();
	    for (User user : users) {
	        if ("student".equals(user.getRole())) {
	            Optional<Student> student = studentRepository.findById(user.getId());
	            student.ifPresent(s -> user.setStudentDetail(s)); // 학생 세부 정보 설정
	        } else if ("teacher".equals(user.getRole())) {
	            Optional<Teacher> teacher = teacherRepository.findById(user.getId());
	            teacher.ifPresent(t -> user.setTeacherDetail(t)); // 교사 세부 정보 설정
	        } else if ("professor".equals(user.getRole())) {
	            Optional<Professor> professor = professorRepository.findById(user.getId());
	            professor.ifPresent(p -> user.setProfessorDetail(p)); // 교수 세부 정보 설정
	        } else if ("collegeManager".equals(user.getRole())) {
	            Optional<CollegeManager> collegeManager = collegeManagerRepository.findById(user.getId());
	            collegeManager.ifPresent(cm -> user.setCollegeManagerDetail(cm)); // 기관 관리자 세부 정보 설정
	        } else if ("schoolManager".equals(user.getRole())) {
	            Optional<SchoolManager> schoolManager = schoolManagerRepository.findById(user.getId());
	            schoolManager.ifPresent(sm -> user.setSchoolManagerDetail(sm)); // 기관 관리자 세부 정보 설정
	        }
	    }
	    return ResponseEntity.ok(users);
	}
	
	@GetMapping("/users/{id}")
	public ResponseEntity<User> getUserById(@PathVariable Long id){
		Optional<User> user = userRepository.findById(id);
		if (user.isPresent()) {
			return ResponseEntity.ok(user.get());
		}else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}
	
	@PutMapping("/users/{id}/approval")
	public ResponseEntity<String> approveUser(@PathVariable Long id, @RequestParam boolean isApproved) {
		Optional<User> userOptional = userRepository.findById(id);
		if (userOptional.isPresent()) {
			User user = userOptional.get();
			user.setApproval(isApproved);
			
			if (isApproved && !user.getRoles().contains("APPROVAL")) {
	            user.addRole("APPROVAL"); // APPROVAL 역할이 없을 경우에만 추가
	        } 
			if (!isApproved) {
				user.removeRole("APPROVAL");
			}
			//여기에 권한 추가 APPROVAL
			userRepository.save(user);
			return ResponseEntity.ok("User approval status updated.");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
		}
	}
	
	@DeleteMapping("/users/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable Long id) {
		if(userRepository.existsById(id)) {
			userRepository.deleteById(id);
			return ResponseEntity.ok("User deleted.");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
		}
	}
	
	   @GetMapping("/matches")
	    public ResponseEntity<List<MatchResponseDto>> getAllMatches() {
	        try {
	            // AdminService를 통해 모든 매칭 정보 조회
	            List<MatchResponseDto> matches = adminService.getAllMatches();

	            // 데이터가 없는 경우 204 No Content 반환
	            if (matches.isEmpty()) {
	                return ResponseEntity.noContent().build();
	            }

	            // 성공적으로 데이터를 반환
	            return ResponseEntity.ok(matches);

	        } catch (Exception e) {
	            // 예외 발생 시 500 Internal Server Error 반환
	            return ResponseEntity.status(500).build();
	        }
	    }
	   
	   // 매칭 ID로 학생과 선생님 정보 조회
	    @GetMapping("/matched-info/{matchId}")
	    public ResponseEntity<MatchedInfoDto> getMatchedInfo(@PathVariable Long matchId) {
	        try {
	            MatchedInfoDto matchedInfo = matchingService.getMatchedInfo(matchId);  // matchId로 학생, 선생님 정보 가져옴
	            return ResponseEntity.ok(matchedInfo);  // 200 OK와 함께 매칭된 정보 반환
	        } catch (EntityNotFoundException e) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);  // 매칭된 정보가 없으면 404 반환
	        }
	    }

}
