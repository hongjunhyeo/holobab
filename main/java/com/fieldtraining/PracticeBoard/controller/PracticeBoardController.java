package com.fieldtraining.PracticeBoard.controller;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fieldtraining.PracticeBoard.dto.CommentRequestDto;
import com.fieldtraining.PracticeBoard.dto.PracticeBoardDetailDto;
import com.fieldtraining.PracticeBoard.dto.PracticeBoardRequestDto;
import com.fieldtraining.PracticeBoard.dto.PracticeBoardResponseDto;
import com.fieldtraining.PracticeBoard.dto.PracticeBoardUpdateDto;
import com.fieldtraining.PracticeBoard.service.PracticeBoardService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/practice")
@RequiredArgsConstructor
@RestController
public class PracticeBoardController {

	@Autowired
	PracticeBoardService practiceBoardService;

	// 파일 포함 글쓰기
	@PostMapping(value = "/write", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })	
	public PracticeBoardResponseDto createBoard(
			@ModelAttribute PracticeBoardRequestDto practiceBoardRequestDto,
			@RequestParam(value = "files", required = false)  List<MultipartFile> files) throws IOException {
		return practiceBoardService.createBoard(practiceBoardRequestDto, files);
	}

	// 게시판 목록, 검색
	@GetMapping("/list")
	public Page<PracticeBoardResponseDto> getBoardsByRole(
			@RequestParam Long userId,
			@RequestParam(required = false) String keyword,
			@RequestParam int page,
			@RequestParam int size
			) {
		return practiceBoardService.getBoardsByRole(userId, page, size, keyword);
	}
	
	// 게시판 상세정보
	@GetMapping("/detail")
	public PracticeBoardDetailDto practiceBoardDetail(@RequestParam Long boardID ) {
		return practiceBoardService.practiceBoardDetail(boardID);
	}

	//게시판 수정
	@PostMapping(value = "/update", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	public void updateBoard(
			@ModelAttribute PracticeBoardUpdateDto updateDto,
			@RequestParam(value = "files", required = false)  List<MultipartFile> files) throws IOException{

		practiceBoardService.updateBoard(updateDto, files);
	}
	
	
	//파일 다운로드
	@GetMapping(value = "/download")
	public ResponseEntity<Resource> downloadFile(@RequestParam String filePath) {
	    try {
	        Path path = Paths.get(filePath);

	        if (!Files.exists(path) || !Files.isReadable(path)) {
	            throw new FileNotFoundException("File not found or not readable: " + filePath);
	        }

	        Resource resource = new UrlResource(path.toUri());
	        String encodedFileName = URLEncoder.encode(path.getFileName().toString(), StandardCharsets.UTF_8.toString());

	        HttpHeaders headers = new HttpHeaders();
	        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + encodedFileName + "\"");
	        headers.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_OCTET_STREAM_VALUE);

	        return ResponseEntity.ok()
	                .headers(headers)
	                .body(resource);

	    } catch (FileNotFoundException e) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	    }
	}


	// 게시판 삭제
	@GetMapping("/detail/delete")
	public void practiceBoardDelete(@RequestParam Long boardID) {
		practiceBoardService.practiceBoardDelete(boardID);
	}	

	// 파일 삭제
	@GetMapping("/update/fileDelete")
	public void fileDelete(@RequestParam Long fileID) {
		practiceBoardService.fileDelete(fileID);
	}
	
	// 댓글 생성
	@PostMapping("/detail/commentWrite")
	public void createComment(@RequestBody CommentRequestDto dto) {
		practiceBoardService.createComment(dto);
	}
	
	// 댓글 삭제
	@GetMapping("/detail/commentDelete")
	public void commentDelete(@RequestParam Long commentID) {
		practiceBoardService.commentDelete(commentID);
	}
	

}