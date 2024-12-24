import React, { useState, useEffect } from "react";
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from "react-router-dom";

import "./ManagerInfoModify.css";

const BASE_URL = "http://localhost:8090/api/managerInfo";

const ManagerInfoModify = () => {
    const navigate = useNavigate();
    const [managerInfo, setManagerInfo] = useState({
        userId: "",
        password: "",
        confirmPassword: "",
        officeNumber: "",
        address: "",
        collegeName: "",
        schoolName: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true); 
    const [role, setRole] = useState(""); 
    const [passwordMatchError, setPasswordMatchError] = useState("");

    useEffect(() => {
        const fetchManagerInfo = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('로그인 정보가 없습니다.');
                }

                const decodedToken = jwtDecode(token);
                const userId = decodedToken.userId;
                const roles = decodedToken.roles;
                const sub = decodedToken.sub;

                setRole(roles.includes("ROLE_COLLEGE_MANAGER") ? "ROLE_COLLEGE_MANAGER" : "ROLE_SCHOOL_MANAGER");

                let url = '';
                if (roles.includes("ROLE_COLLEGE_MANAGER")) {
                    url = `${BASE_URL}/college/edit/${userId}`;
                } else if (roles.includes("ROLE_SCHOOL_MANAGER")) {
                    url = `${BASE_URL}/school/edit/${userId}`;
                } else {
                    throw new Error('지원되지 않는 역할입니다.');
                }

                const response = await axios.get(url);
                setManagerInfo({
                    ...managerInfo,
                    sub,
                    address: response.data.address,
                    officeNumber: response.data.officeNumber,
                    schoolName: response.data.schoolName,
                    college: response.data.college,
                });
            } catch (err) {
                console.error('매니저 정보 불러오기 오류:', err);
                setError(err.message || '매니저 정보를 불러오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };
        fetchManagerInfo();
    }, []);

    useEffect(() => {
        const { password, confirmPassword, officeNumber, address } = managerInfo;

        setIsSubmitDisabled(
            !password || password !== confirmPassword || !officeNumber || !address
        );
    }, [managerInfo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setManagerInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleConfirmPasswordChange = (e) => {
        const { value } = e.target;
        setManagerInfo((prevInfo) => ({
            ...prevInfo,
            confirmPassword: value,
        }));
    
        if (value !== managerInfo.password) {
            setPasswordMatchError("비밀번호가 일치하지 않습니다.");
        } else {
            setPasswordMatchError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');

            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;
            const roles = decodedToken.roles;

            let url = '';
            if (roles.includes("ROLE_COLLEGE_MANAGER")) {
                url = `${BASE_URL}/college/${userId}`;
            } else if (roles.includes("ROLE_SCHOOL_MANAGER")) {
                url = `${BASE_URL}/school/${userId}`;
            } else {
                throw new Error('지원되지 않는 역할입니다.');
            }

            const { confirmPassword, ...dataToSend } = managerInfo;

            await axios.put(url, dataToSend, {
                headers: { Authorization: `Bearer ${token}` },
            });

            alert('정보가 성공적으로 업데이트되었습니다.');
            navigate("/managerInfo");
        } catch (err) {
            setError(err.message || '정보 업데이트 중 오류가 발생했습니다.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
    
    return (
        <div className="manager-modify-wrapper">
            <form className="manager-modify-container" onSubmit={handleSubmit}>
                <h1 className="manager-modify-title">회원정보 수정</h1>
                <div className="user-info">
                    <span className="user-info-label">아이디</span>
                    <span className="user-info-value">{managerInfo.sub}</span>
                </div>
                <div className="user-info">
                    <span className="user-info-label">비밀번호</span>
                    <input
                        className="manager-modify-input"
                        type="password"
                        name="password"
                        value={managerInfo.password}
                        onChange={handleChange}
                        placeholder="새 비밀번호"
                    />
                </div>
                <div className="user-info">
                    <span className="user-info-label">비밀번호 확인</span>
                    <input
                        className="manager-modify-input"
                        type="password"
                        name="confirmPassword"
                        value={managerInfo.confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        placeholder="비밀번호 확인"
                    />
                </div>
                {passwordMatchError && <div className="error-message">{passwordMatchError}</div>}
                <div className="user-info">
                    <span className="user-info-label">사무실 번호</span>
                    <input
                        className="manager-modify-input"
                        type="text"
                        name="officeNumber"
                        value={managerInfo.officeNumber}
                        onChange={handleChange}
                        placeholder="예 : 02-1234-1234"
                    />
                </div>
                <div className="user-info">
                    <span className="user-info-label">주소</span>
                    <input
                        className="manager-modify-input"
                        type="text"
                        name="address"
                        value={managerInfo.address}
                        onChange={handleChange}
                        placeholder="주소를 입력하세요"
                    />
                </div>
                {role === "ROLE_SCHOOL_MANAGER" && (
                    <div className="user-info">
                        <span className="user-info-label">학교 이름</span>
                        <input
                            className="manager-modify-input"
                            type="text"
                            name="schoolName"
                            value={managerInfo.schoolName || ""}
                            onChange={handleChange}
                            placeholder="학교 이름"
                        />
                    </div>
                )}
                {role === "ROLE_COLLEGE_MANAGER" && (
                    <div className="user-info">
                        <span className="user-info-label">대학 이름</span>
                        <input
                            className="manager-modify-input"
                            type="text"
                            name="college"
                            value={managerInfo.college || ""}
                            onChange={handleChange}
                            placeholder="대학 이름"
                        />
                    </div>
                )}
                <button className="submit-button" type="submit" disabled={isSubmitDisabled}>
                    정보 수정
                </button>
            </form>
        </div>
    );
};

export default ManagerInfoModify;