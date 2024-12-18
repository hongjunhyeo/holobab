import React, { useEffect, useState, useRef } from 'react';
import axiosInstance from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const GalleryWrite = () => {
    const [title, setTitle] = useState(""); // 갤러리 제목
    const [fileList, setFileList] = useState([]); // 파일 리스트를 관리
    const fileInputRef = useRef(null); // 숨겨진 파일 입력 필드를 참조
    const [message, setMessage] = useState(""); // 성공/실패 메시지
    const [isSubmitting, setIsSubmitting] = useState(false); // 로딩 상태

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    // 파일 추가 버튼 클릭 시 파일 선택 트리거
    const handleAddFile = () => {
        fileInputRef.current.click(); // 숨겨진 input을 클릭
    };

    // 파일 선택 시 파일 리스트에 추가
    const handleFileChange = (e) => {
        const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
        const selectedFiles = Array.from(e.target.files);
        const validFiles = selectedFiles.filter(file => file.size <= MAX_FILE_SIZE);

        if (validFiles.length !== selectedFiles.length) {
            alert("10MB 이하의 파일만 업로드 가능합니다.");
        }
        setFileList((prevList) => [...prevList, ...selectedFiles]); // 기존 파일과 합치기
    };
  
    // 업로드 처리
    const handleSubmit = async (e) => {
        e.preventDefault();

        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken);
        const sub = decodedToken.userId;
        const formData = new FormData();
        formData.append("title", title);
        formData.append("userId", sub);  // userId를 'userId'라는 이름으로 설정
        fileList.forEach((file) => {
            formData.append("files", file); // 'files'라는 이름으로 추가
        });

        try {
            const response = await axiosInstance.post("/api/gallery/write", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",  // 반드시 이 헤더를 설정
                },
            });
            console.log("글 작성 성공:", response.data);
            alert("게시글이 작성 되었습니다!");
            navigate("/gallery");
        } catch (error) {
            console.error("글 작성 실패:", error.response);
            // 오류 응답 내용 출력
        }
    };
    return(
        <div className="write-container">
            <h1 className="write-title">게시글 작성</h1>
            {message && <p className={`message ${message.type}`}>{message.text}</p>}
            <form onSubmit={handleSubmit} className="write-form">
            <input
                type="text"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="write-input"
            />
            {/* 숨겨진 파일 입력 */}
            <input
                type="file"
                ref={fileInputRef} // 참조 연결
                multiple
                style={{ display: "none" }} // 화면에 보이지 않음
                onChange={handleFileChange}
            />
            {/* 파일 추가 버튼 */}
            <button type="button" onClick={handleAddFile} className="file-add-button">
                파일 추가
            </button>
            {/* 선택된 파일 리스트 보여주기 */}
            <ul className="file-list">
                {fileList.map((file, index) => (
                    <li key={index} className="file-item">
                        {file.name}
                        {file.type.startsWith("image/") && (
                            <img
                                src={URL.createObjectURL(file)}
                                alt="미리보기"
                                className="file-preview"
                                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                            />
                        )}
                    </li>
                ))}
            </ul>
            <button type="submit" className="submit-button" disabled={isSubmitting}>
                    {isSubmitting ? "작성 중..." : "작성"}
            </button>
        </form>
    </div>
  );
};

export default GalleryWrite;
