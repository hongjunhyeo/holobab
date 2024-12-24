package com.fieldtraining.mypage.controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fieldtraining.controller.SignController;
import com.fieldtraining.data.entity.User;
import com.fieldtraining.data.repository.UserRepository;
import com.fieldtraining.mypage.dto.MypageProfessorDto;
import com.fieldtraining.mypage.dto.MypageResponseDto;
import com.fieldtraining.mypage.dto.MypageStudentDto;
import com.fieldtraining.mypage.dto.MypageTeacherDto;
import com.fieldtraining.mypage.service.MypageService;

@RestController
@RequestMapping("/mypage")
public class MypageController {
   
    private final Logger LOGGER = LoggerFactory.getLogger(SignController.class);


    @Autowired
    private MypageService mypageService;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/userinfo")
    public ResponseEntity<MypageResponseDto> userInfo(@RequestParam Long id) {
        MypageResponseDto userInfo = mypageService.userInfo(id);
        return ResponseEntity.ok(userInfo);
    }
    
    @PostMapping("/update")
    public ResponseEntity<Void> updateUserInfo(@RequestBody MypageResponseDto userInfoDto) {
        switch (userInfoDto.getClass().getSimpleName()) {
            case "MypageStudentDto":
                mypageService.updateUserInfo((MypageStudentDto) userInfoDto);
                break;
            case "MypageTeacherDto":
                mypageService.updateUserInfo((MypageTeacherDto) userInfoDto);
                break;
            case "MypageProfessorDto":
                mypageService.updateUserInfo((MypageProfessorDto) userInfoDto);
                break;
            default:
                throw new IllegalArgumentException("Unsupported role type");
        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
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
    
    @PostMapping("/verify-password")
    public ResponseEntity<Map<String, Object>> verifyPassword(@RequestParam Long userId, @RequestParam String password) {
        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "User not found"));
        }

        // 비밀번호 검증
        boolean isValid = passwordEncoder.matches(password, user.getPassword());
        if (isValid) {
            return ResponseEntity.ok(Map.of("isValid", true)); // 비밀번호가 일치하면 true 반환
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("isValid", false)); // 비밀번호가 틀리면 false 반환
        }
    }
}