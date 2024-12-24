package com.fieldtraining.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fieldtraining.data.entity.Student;
import com.fieldtraining.data.entity.Teacher;
import com.fieldtraining.data.repository.StudentRepository;
import com.fieldtraining.data.repository.TeacherRepository;
import com.fieldtraining.matching.dto.MatchResponseDto;
import com.fieldtraining.matching.dto.MatchedInfoDto;
import com.fieldtraining.matching.entity.Match;
import com.fieldtraining.matching.repository.MatchRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class AdminService {

    @Autowired
    private MatchRepository matchRepository;
    
    @Autowired
    private StudentRepository studentRepository;
    
    @Autowired
    private TeacherRepository teacherRepository;

    public List<MatchResponseDto> getAllMatches() {
        // Match 테이블의 모든 데이터 조회
        List<Match> matches = matchRepository.findAll();

        // Match -> MatchResponseDto로 변환
        return matches.stream()
                .map(match -> new MatchResponseDto(
                        match.getId(),
                        match.getStudent() != null ? match.getStudent().getName() : "Unknown Student",
                        match.getTeacher() != null ? match.getTeacher().getName() : "Unknown Teacher",
                        match.getStudent().getSchoolName(),
                        match.isMatchApproved()
                ))
                .collect(Collectors.toList());
    }
    
   public MatchedInfoDto getMatchedInfo(Long matchId) {
        Match match = matchRepository.findById(matchId)
                .orElseThrow(() -> new EntityNotFoundException("매칭된 데이터가 없습니다. matchId: " + matchId));

        // 학생 정보
        Student student = studentRepository.findById(match.getStudent().getId())
                .orElseThrow(() -> new EntityNotFoundException("학생 정보가 없습니다. studentId: " + match.getStudent().getId()));

        // 선생님 정보
        Teacher teacher = teacherRepository.findById(match.getTeacher().getId())
                .orElseThrow(() -> new EntityNotFoundException("선생님 정보가 없습니다. teacherId: " + match.getTeacher().getId()));

        // DTO로 반환
        return MatchedInfoDto.builder()
              .id(match.getId())
                .studentName(student.getName())
                .studentSchool(student.getSchoolName())
                .studentSubject(student.getSubject())
                .studentEmail(student.getEmail())
                .studentCollege(student.getCollege())
                .studentDepartment(student.getDepartment())
                .studentPhoneNumber(student.getPhoneNumber())
                .teacherName(teacher.getName())
                .teacherSchool(teacher.getSchoolName())
                .teacherSubject(teacher.getSubject())
                .teacherEmail(teacher.getEmail())
                .teacherPhoneNumber(teacher.getPhoneNumber())
                .teacherOfficeNumber(teacher.getOfficeNumber())
                .build();
    }
}
