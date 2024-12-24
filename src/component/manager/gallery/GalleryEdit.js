import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import { jwtDecode } from 'jwt-decode';

import "./GalleryEdit.css";

const GalleryEdit = () => {
    const [galleryDetail, setGalleryDetail] = useState(null);
    const [files, setFiles] = useState([]); // 여러 파일을 업로드할 상태로 변경
    const fileInputRef = useRef(null); // 숨겨진 파일 입력 필드를 참조
    const navigate = useNavigate();
    const { boardID } = useParams(); // URL에서 boardID 가져오기
    const token = localStorage.getItem("token");

    useEffect(() => {
        // 서버에서 갤러리 상세 정보 요청
        axiosInstance.get(`/api/gallery/${boardID}`)
            .then(response => {
                setGalleryDetail(response.data);
            })
            .catch(error => {
                console.error('갤러리 수정페이지 불러오기 오류', error);
            });
    }, [boardID]);  // boardID가 변경될 때마다 다시 요청

    if (!galleryDetail) {
        return <div>Loading...</div>;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGalleryDetail((prevGallery) => ({
            ...prevGallery,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const selectedFiles = e.target.files;  // 다중 파일 선택 가능
        if (selectedFiles) {
            setFiles([...files, ...selectedFiles]); // 기존 파일 목록에 새로 추가
        }
    };

    const handleFileDelete = (fileId) => {
        setGalleryDetail((prevDetail) => ({
            ...prevDetail,
            files: prevDetail.files.filter((file) => file.id !== fileId),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const decodedToken = jwtDecode(token);
        const sub = decodedToken.sub;

        const formData = new FormData();

        formData.append("title", galleryDetail.title);  // 수정된 제목
        formData.append("writerName", sub);  // 수정된 작성자 => userId로 변경

        files.forEach((file) => {
            formData.append("files", file);  // 새로 업로드된 파일 추가
        });

        // 파일과 다른 데이터를 FormData로 서버로 전송
        axiosInstance.put(`/api/gallery/${boardID}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",  // 파일 전송을 위한 Content-Type 설정
            },
        })
        .then(response => {
            console.log('갤러리 수정 완료', response);
            alert('갤러리가 수정되었습니다.');
            navigate(`/gallery/galleryDetail/${boardID}`); // 수정 완료 후 상세페이지로 이동
        })
        .catch(error => {
            console.error('갤러리 수정 실패', error.response.data);
            alert('수정에 실패했습니다.');
        });
    };

    // 파일 추가 버튼 클릭 시 파일 선택 트리거
    const handleAddFile = () => {
        fileInputRef.current.click(); // 숨겨진 input을 클릭
    };

    return (
        <div className="galleryModify-container">
            <h2 className="galleryModify-title">갤러리 수정</h2>
            <form className="Modify-form" onSubmit={handleSubmit}>
                <div className="detail-title">
                    <label>제목:</label>
                    <input
                        type="text"
                        name="title"
                        value={galleryDetail.title}
                        onChange={handleInputChange}
                        className="write-input"
                        required
                    />
                </div>
                {/* 파일 업로드 */}
                <div className="detail-file">
                    <label>파일 업로드:</label>
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
                    {galleryDetail.files.length > 0 ? (
                        <div>
                            <h4>현재 파일:</h4>
                            <ul>
                                {galleryDetail.files.map((file) => (
                                    <li key={file.id} className="file-item">
                                        <img className="img" src={`http://localhost:8090${file.imgUrl}`} alt={file.originalName} width={100} />
                                        <button type="button" onClick={() => handleFileDelete(file.id)}>
                                            삭제
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p>파일 없음</p>
                    )}
                </div>
                <button className="detail-edit" type="submit">수정하기</button>
            </form>
        </div>
    );
};

export default GalleryEdit;
