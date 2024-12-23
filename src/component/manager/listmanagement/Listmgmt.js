import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import SchoolList from './SchoolList';
import CollegeList from './CollegeList';
import Sidebar from '../../Sidebar';

import "./Listmgmt.css";

const Listmgmt = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRoles, setUserRoles] = useState('');

    useEffect(() => {
        const handleStorageChange = () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    setUserRoles(decodedToken.roles || []);// 토큰에서 role 가져오기
                    setIsLoggedIn(true);
                } catch (error) {
                    console.error("JWT 디코딩 오류:", error);
                    setIsLoggedIn(false);
                }
            } else {
                setIsLoggedIn(false);
            }
        };

        handleStorageChange(); // 초기화

        // storage 이벤트 리스너 등록
        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return(
        <div className='listmgmt-container'>
            <Sidebar />
            <div className='listsection-container'>
                {isLoggedIn ? (
                    // userRole에 따라 적절한 컴포넌트를 렌더링
                    userRoles.includes("ROLE_SCHOOL_MANAGER") ? (
                        <SchoolList />
                    ) : userRoles.includes("ROLE_COLLEGE_MANAGER") ? (
                        <CollegeList />
                    ) : (
                    <p>지원되지 않는 역할입니다.</p>
                    )
                ) : (
                    <p>로그인해주세요.</p>
                )}
            </div>
        </div>
    );
};

export default Listmgmt;