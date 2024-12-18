package com.fieldtraining.gallery.service;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.fieldtraining.data.entity.User;
import com.fieldtraining.data.repository.ProfessorRepository;
import com.fieldtraining.data.repository.StudentRepository;
import com.fieldtraining.data.repository.TeacherRepository;
import com.fieldtraining.data.repository.UserRepository;
import com.fieldtraining.gallery.dto.GalleryDetailDto;
import com.fieldtraining.gallery.dto.GalleryFileDto;
import com.fieldtraining.gallery.entity.Gallery;
import com.fieldtraining.gallery.entity.GalleryFile;
import com.fieldtraining.gallery.repository.GalleryFileRepository;
import com.fieldtraining.gallery.repository.GalleryRepository;
import com.fieldtraining.managerInfo.repository.CollegeRepository;
import com.fieldtraining.managerInfo.repository.SchoolRepository;

@Service
@Transactional
public class GalleryService {

	private final GalleryRepository galleryRepository;
    private final GalleryFileRepository galleryFileRepository;
    private final UserRepository userRepository;
    
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final ProfessorRepository professorRepository;
    private final CollegeRepository collegeRepository;
    private final SchoolRepository schoolRepository;
    
    public GalleryService(GalleryRepository galleryRepository, GalleryFileRepository galleryFileRepository,
    		UserRepository userRepository,
    		StudentRepository studentRepository,
            TeacherRepository teacherRepository,
            ProfessorRepository professorRepository,
            CollegeRepository collegeRepository,
            SchoolRepository schoolRepository) {
        this.galleryRepository = galleryRepository;
        this.galleryFileRepository = galleryFileRepository;
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.professorRepository = professorRepository;
        this.collegeRepository = collegeRepository;
        this.schoolRepository = schoolRepository;
    }
    
    // 갤러리 생성
    public void createGallery(GalleryDetailDto galleryDetailDto, String userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Gallery gallery = Gallery.builder()
                .title(galleryDetailDto.getTitle())
                .writerName(user.getUsername())
                .date(LocalDateTime.now()) // 현재 시간
                .writer(user)  // 작성자 정보 추가
                .build();

        galleryRepository.save(gallery);

        // 파일 업로드 처리
        for (GalleryFileDto fileDto : galleryDetailDto.getFiles()) {
            GalleryFile galleryFile = GalleryFile.builder()
                    .originalName(fileDto.getOriginalName())
                    .imgUrl(fileDto.getImgUrl())
                    .fileSize(fileDto.getFileSize())
                    .repimgYn(fileDto.getRepimgYn())
                    .gallery(gallery)
                    .build();
            galleryFileRepository.save(galleryFile);
        }
    }

    // 파일 업로드 처리
    public void uploadFiles(Long boardID, List<MultipartFile> files) {
        Gallery gallery = galleryRepository.findById(boardID)
                .orElseThrow(() -> new RuntimeException("Gallery not found"));

        for (MultipartFile file : files) {
            String filePath = saveFile(file);  // 파일 저장 경로

            GalleryFile galleryFile = GalleryFile.builder()
                    .originalName(file.getOriginalFilename())
                    .imgUrl(filePath)  // 파일 경로 저장
                    .fileSize(file.getSize())
                    .repimgYn(false)  // 기본값은 false
                    .gallery(gallery)
                    .build();

            galleryFileRepository.save(galleryFile);
        }
    }

    // 파일을 서버에 저장하는 메서드
    private String saveFile(MultipartFile file) {
        // 파일을 저장할 경로 설정
        String filePath = "/uploads/" + file.getOriginalFilename();
        try {
            File dest = new File(filePath);
            file.transferTo(dest);  // 실제 파일 저장
        } catch (IOException e) {
            e.printStackTrace();
        }
        return filePath;
    }

    // 갤러리 상세 조회
    public GalleryDetailDto getGalleryDetail(Long boardID) {
        Gallery gallery = galleryRepository.findById(boardID)
                .orElseThrow(() -> new RuntimeException("Gallery not found"));

        List<GalleryFileDto> files = gallery.getFiles().stream()
                .map(file -> GalleryFileDto.builder()
                        .id(file.getId())
                        .originalName(file.getOriginalName())
                        .imgUrl(file.getImgUrl())
                        .fileSize(file.getFileSize())
                        .repimgYn(file.getRepimgYn())
                        .build())
                .collect(Collectors.toList());

        return GalleryDetailDto.builder()
                .boardID(gallery.getBoardID())
                .title(gallery.getTitle())
                .writerName(gallery.getWriterName())
                .date(gallery.getDate())
                .files(files)
                .build();
    }

    // 갤러리 수정
    public void updateGallery(Long boardID, GalleryDetailDto galleryDetailDto) {
        Gallery gallery = galleryRepository.findById(boardID)
                .orElseThrow(() -> new RuntimeException("Gallery not found"));

        // 갤러리 수정
        gallery.setTitle(galleryDetailDto.getTitle());
        gallery.setWriterName(galleryDetailDto.getWriterName());

        galleryRepository.save(gallery);

        // 기존 파일 삭제 (옵션)
        galleryFileRepository.deleteAllByGalleryBoardID(boardID);

        // 새로운 파일들 추가
        for (GalleryFileDto fileDto : galleryDetailDto.getFiles()) {
            GalleryFile galleryFile = GalleryFile.builder()
                    .originalName(fileDto.getOriginalName())
                    .imgUrl(fileDto.getImgUrl())
                    .fileSize(fileDto.getFileSize())
                    .repimgYn(fileDto.getRepimgYn())
                    .gallery(gallery)
                    .build();
            galleryFileRepository.save(galleryFile);
        }
    }

    // 갤러리 삭제
    public void deleteGallery(Long boardID) {
        Gallery gallery = galleryRepository.findById(boardID)
                .orElseThrow(() -> new RuntimeException("Gallery not found"));

        // 갤러리 파일 삭제
        galleryFileRepository.deleteAllByGalleryBoardID(boardID);

        // 갤러리 삭제
        galleryRepository.delete(gallery);
    }

    // 파일 삭제
    public void deleteFile(Long fileID) {
        GalleryFile galleryFile = galleryFileRepository.findById(fileID)
                .orElseThrow(() -> new RuntimeException("File not found"));

        galleryFileRepository.delete(galleryFile);
    }

    // 대표 이미지 설정
    public void setRepresentativeImage(Long fileID, Boolean isRepImg) {
        GalleryFile galleryFile = galleryFileRepository.findById(fileID)
                .orElseThrow(() -> new RuntimeException("File not found"));

        galleryFile.setRepimgYn(isRepImg);  // 대표 이미지 설정

        galleryFileRepository.save(galleryFile);
    }
    
    // 역할에 따라 소속 정보 가져오기
    public String getAffiliationByRole(Long id, String role) {
        if ("student".equals(role)) {
            return studentRepository.findById(id)
                    .map(student -> student.getSchoolName())
                    .orElse(null);
        } else if ("teacher".equals(role)) {
            return teacherRepository.findById(id)
                    .map(teacher -> teacher.getSchoolName())
                    .orElse(null);
        } else if ("schoolManager".equals(role)) {
            return schoolRepository.findById(id)
                    .map(manager -> manager.getSchoolName())
                    .orElse(null);
        } else if ("professor".equals(role)) {
            return professorRepository.findById(id)
                    .map(professor -> professor.getCollege())
                    .orElse(null);
        } else if ("collegeManager".equals(role)) {
            return collegeRepository.findById(id)
                    .map(manager -> manager.getCollege())
                    .orElse(null);
        }
        return null;
    }


 // 소속 정보에 맞는 갤러리 목록 조회
    public List<GalleryDetailDto> getGalleriesByAffiliation(String affiliation) {
        return galleryRepository.findByAffiliation(affiliation).stream()
                .map(gallery -> GalleryDetailDto.builder()
                        .boardID(gallery.getBoardID())
                        .title(gallery.getTitle())
                        .writerName(gallery.getWriterName())
                        .date(gallery.getDate())
                        .files(gallery.getFiles().stream()
                                .map(file -> GalleryFileDto.builder()
                                        .id(file.getId())
                                        .originalName(file.getOriginalName())
                                        .imgUrl(file.getImgUrl())
                                        .fileSize(file.getFileSize())
                                        .repimgYn(file.getRepimgYn())
                                        .build())
                                .collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList());
    }

}
