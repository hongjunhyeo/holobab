import axios from "axios";
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../../Sidebar";
import "./Gallery.css";

const Gallery = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [galleries, setGalleries] = useState([]);
    const [userRole, setUserRole] = useState(null);  // 사용자 role 상태 추가
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const decodedToken = jwtDecode(token);
                    const role = decodedToken.roles;

                    // ROLE_NAME 변환
                    let roleName = 'unknown';

                    if (role.includes('ROLE_SCHOOL_MANAGER')) {
                        roleName = 'schoolManager';
                    } else if (role.includes('ROLE_PROFESSOR')) {
                        roleName = 'professor';
                    } else if (role.includes('ROLE_TEACHER')) {
                        roleName = 'teacher';
                    } else if (role.includes('ROLE_STUDENT')) {
                        roleName = 'student';
                    } else if (role.includes('ROLE_COLLEGE_MANAGER')) {
                        roleName = 'collegeManager';
                    } else if (role.includes('ROLE_ADMIN')) {
                        roleName = 'admin';
                    }

                    setUserRole(roleName);
                } else {
                    setUserRole('guest'); // 비로그인 상태는 'guest'로 설정
                }

                // 갤러리 데이터를 로드 (비로그인 포함)
                const galleriesResponse = await axios.get(`http://localhost:8090/api/gallery/recent`);
                console.log('갤러리 데이터:', galleriesResponse.data);
                setGalleries(galleriesResponse.data);

            } catch (err) {
                console.error('갤러리 데이터 불러오기 오류:', err);
                setError(err.message || '갤러리 데이터를 불러오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };
        fetchInfo();
    }, []);

    const onClickGallerySave = () => {
        navigate("/gallery/galleryWrite");
    }

    // 작성하기 버튼을 보여줄 조건
    const canWriteGallery = userRole === 'schoolManager' || userRole === 'collegeManager' || userRole === 'admin';

    return (
        <div className="gallery-wrapper">
            <div className="gallery-container">
                <Sidebar />
                <h1 className="gallery-title">갤러리</h1>
                {!loading && !error && galleries.length > 0 ? (
                    <div className="gallery-section">
                        <ul className="gallery-detail">
                            {galleries.map((gallery) => (
                                <li
                                    className="detail-container"
                                    key={gallery.boardID}
                                    onClick={() => navigate(`/gallery/galleryDetail/${gallery.boardID}`)} // gallery-detail 클릭 시 이동
                                    style={{ cursor: 'pointer' }} // 마우스 포인터를 손 모양으로 변경
                                >
                                    <span className="img-container">
                                        {gallery.files && gallery.files.length > 0 ? (
                                            <img className="img" src={`http://localhost:8090${gallery.files[0].imgUrl}`} />
                                        ) : (
                                            <p>파일이 없습니다.</p>
                                        )}
                                    </span>
                                    <span className="detail-info">
                                        <strong className="detail-title">{gallery.title}</strong>
                                        <div className="detail-row">
                                            <span className="detail-write">{gallery.writerName}</span>
                                            <span className="detail-date">{gallery.date}</span>
                                        </div>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>갤러리가 존재하지 않습니다.</p>
                )}
                {/* 조건에 맞는 경우에만 작성하기 버튼 표시 */}
                {canWriteGallery && (
                    <button onClick={onClickGallerySave}>작성하기</button>
                )}
            </div>
        </div>
    );
};

export default Gallery;
