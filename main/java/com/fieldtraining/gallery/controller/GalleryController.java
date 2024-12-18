package com.fieldtraining.gallery.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fieldtraining.gallery.dto.GalleryDetailDto;
import com.fieldtraining.gallery.service.GalleryService;

@RestController
@RequestMapping("/api/gallery")
public class GalleryController {
	private final GalleryService galleryService;
	
	public GalleryController(GalleryService galleryService) {
		this.galleryService = galleryService;
	}
	
	// 갤러리 생성
    @PostMapping
    public ResponseEntity<Void> createGallery(@RequestBody GalleryDetailDto galleryDetailDto, @RequestParam String userId) {
        galleryService.createGallery(galleryDetailDto, userId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // 갤러리 파일 업로드
    @PostMapping("/{boardID}/files")
    public ResponseEntity<Void> uploadFiles(@PathVariable Long boardID, @RequestParam("files") List<MultipartFile> files) {
        galleryService.uploadFiles(boardID, files);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 갤러리 상세 조회
    @GetMapping("/{boardID}")
    public ResponseEntity<GalleryDetailDto> getGalleryDetail(@PathVariable Long boardID) {
        GalleryDetailDto galleryDetail = galleryService.getGalleryDetail(boardID);
        return ResponseEntity.status(HttpStatus.OK).body(galleryDetail);
    }

    // 갤러리 수정
    @PutMapping("/{boardID}")
    public ResponseEntity<Void> updateGallery(@PathVariable Long boardID, @RequestBody GalleryDetailDto galleryDetailDto) {
        galleryService.updateGallery(boardID, galleryDetailDto);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    // 갤러리 삭제
    @DeleteMapping("/{boardID}")
    public ResponseEntity<Void> deleteGallery(@PathVariable Long boardID) {
        galleryService.deleteGallery(boardID);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    // 파일 삭제
    @DeleteMapping("/files/{fileID}")
    public ResponseEntity<Void> deleteFile(@PathVariable Long fileID) {
        galleryService.deleteFile(fileID);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    // 대표 이미지 설정
    @PutMapping("/files/{fileID}/repimg")
    public ResponseEntity<Void> setRepresentativeImage(@PathVariable Long fileID, @RequestParam Boolean isRepImg) {
        galleryService.setRepresentativeImage(fileID, isRepImg);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
    
    // 역할과 소속 정보 가져오기
    @GetMapping("/affiliation/{Id}/{role}")
    public ResponseEntity<String> getAffiliationByRole(@PathVariable Long Id, @PathVariable String role) {
        String affiliation = galleryService.getAffiliationByRole(Id, role);
        if (affiliation != null) {
            return ResponseEntity.ok(affiliation);
        }
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("/galleries/{affiliation}")
    public ResponseEntity<List<GalleryDetailDto>> getGalleriesByAffiliation(@PathVariable String affiliation) {
        List<GalleryDetailDto> galleries = galleryService.getGalleriesByAffiliation(affiliation);
        return ResponseEntity.ok(galleries);
    }

}
