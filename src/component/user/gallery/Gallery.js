import axios from "axios";
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const Gallery = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [galleries, setGalleries] = useState([]);
    const [affiliation, setAffiliation] = useState(null);
    useEffect(() => {
        const fetchInfo = async () => {
            try{
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('로그인 정보가 없습니다.');
                }

                const decodedToken = jwtDecode(token);
                const userId = decodedToken.userId;
                const role = decodedToken.roles;

                // ROLE_NAME 변환
                let roleName = 'unknown';

                if (role === 'ROLE_SCHOOL_MANAGER') {
                    roleName = 'schoolManager';
                } else if (role === 'ROLE_PROFESSOR') {
                    roleName = 'professor';
                } else if (role === 'ROLE_TEACHER') {
                    roleName = 'teacher';
                } else if (role === 'ROLE_STUDENT') {
                    roleName = 'student';
                } else if (role === 'ROLE_COLLEGE_MANAGER') {
                    roleName = 'collegeManager';
                }

                // API 호출
                const affiliationResponse = await axios.get(`http://localhost:8090/api/gallery/affiliation/${userId}/${roleName}`);
                setAffiliation(affiliationResponse.data);
                console.log('기관 이름 정보: ', affiliationResponse.data);

                if (affiliationResponse.data) {
                    const galleriesResponse = await axios.get(
                        `http://localhost:8090/api/gallery/galleries/${affiliationResponse.data}`
                    );
                    setGalleries(galleriesResponse.data); // 갤러리 목록 저장
                }
            } catch(err) {
                console.error('사용자 정보 불러오기 오류:', err);
                setError(err.message || '사용자 정보를 불러오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };
        fetchInfo();
    }, []);

    return(
        <div>
            <h2>갤러리</h2>
            {loading && <p>로딩 중...</p>}
            {error && <p>{error}</p>}
            {(!loading && galleries.length === 0) && <p>갤러리가 존재하지 않습니다.</p>}
            {!loading && !error && galleries.length > 0 && (
                <div>
                    <ul>
                        {galleries.map((gallery) => (
                            <li key={gallery.boardID}>
                                <h3>{gallery.title}</h3>
                                <p>{gallery.writerName}</p>
                                <p>{gallery.date}</p>
                                <ul>
                                    {gallery.files.map((file) => (
                                        <li key={file.id}>
                                            <img src={file.imgUrl} alt={file.originalName} />
                                            <p>{file.originalName}</p>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Gallery;