import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../axiosInstance";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import "./GalleryDetail.css";

const GalleryDetail = () => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const role = decodedToken.roles;
    const navigate = useNavigate();

    const { boardID } = useParams();  // URL에서 boardID 추출
    const [galleryDetail, setGalleryDetail] = useState(null);

    const onClickDelete = async () => {
        try {
          const response = await axiosInstance.delete(`/api/gallery/${boardID}`);
          console.log('갤러리 삭제 완료', response);
          alert("갤러리가 삭제되었습니다");
          navigate("/gallery");  // 삭제가 완료된 후에 이동
        } catch (error) {
          console.error('갤러리 삭제 실패', error);
        }
    };

    const onClickEdit = () => {
        navigate(`/gallery/galleryEdit/${boardID}`);
    }

    useEffect(() => {
        // 서버에서 갤러리 상세 정보 요청
        axiosInstance.get(`/api/gallery/${boardID}`)
            .then(response => {
                setGalleryDetail(response.data);
            })
            .catch(error => {
                console.error('갤러리 상세페이지 불러오기 오류', error);
            });
    }, [boardID]);  // boardID가 변경될 때마다 다시 요청

    if (!galleryDetail) {
        return <div>Loading...</div>;
    }

    // 역할에 따른 접근 제한 (ROLE_STUDENT 제외)
    const canEditOrDelete = token && role !== null && !role.includes('ROLE_STUDENT') && !role.includes('ROLE_TEACHER') && !role.includes('ROLE_PROFESSOR');

    return (
        <div className="GalleryDetail-container">
          <form className="board-form">
            <table className="board-detail-table">
              <thead>
                <tr>
                  <th colSpan="2" className="board-title-header">
                    <h1 className="board-title">{galleryDetail.title}</h1>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="label">작성자</td>
                  <td>{galleryDetail.writerName}</td>
                </tr>
                <tr>
                  <td className="label">등록일</td>
                  <td>{galleryDetail.date}</td>
                </tr>
                <tr>
                  <td className="label2">내용</td>
                    <td>
                      <div className="img-content">
                        <ul>
                          {galleryDetail.files.map(file => (
                            <li key={file.id}>
                              <img className="img" src={`http://localhost:8090${file.imgUrl}`} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </td>
                </tr>
                <tr>
                  <td colSpan="3" className="board-buttons">
                    <button className="action-button list-button" type="button">
                      목록
                    </button>
                    {canEditOrDelete && (
                      <>
                        <button onClick={onClickEdit} className="action-button update-button" type="button">
                          수정
                        </button>
                        <button onClick={onClickDelete} className="action-button delete-button" type="button">
                          삭제
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
    );
};

export default GalleryDetail;