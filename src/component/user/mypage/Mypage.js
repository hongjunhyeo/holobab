import React, { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import "./Mypage.css"; // CSS 파일 import
import Sidebar from "../../Sidebar";
import axiosInstance from "../../axiosInstance";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // 로컬 스토리지에서 JWT 토큰 가져오기
  const [userInfo, setUserInfo] = useState(null);
  const [editedInfo, setEditedInfo] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState(""); // 비밀번호 입력 상태
  const [showPasswordModal, setShowPasswordModal] = useState(false); // 비밀번호 입력 모달 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  // 토큰에서 사용자 ID 디코딩
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.userId;

  // 유저 정보 가져오기
  useEffect(() => {
    
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(`/mypage/userinfo?id=${userId}`);
        setUserInfo(response.data);
        setEditedInfo(response.data);
      } catch (err) {
        console.error(err);
        setError("유저 정보를 가져오지 못했습니다.");
      }
    };

    fetchUserInfo();
  },[userId]);

  const handleChange = (field, value) => {
    setEditedInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await axiosInstance.post("/mypage/update", {
        ...editedInfo,
        id: userId,
      });
      setUserInfo(editedInfo);
      setIsEditing(false);
      alert("정보가 성공적으로 업데이트되었습니다.");
    } catch (err) {
      console.error(err);
      alert("정보 업데이트에 실패했습니다.");
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();

    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = async () => {
    setIsLoading(true);
    try {
      // 비밀번호 확인 API 요청
      const response = await axiosInstance.post("/mypage/verify-password", null, {
        params: {
          userId: userId,
          password: password
        }
      });
      if (response.data.isValid) {
        console.log("userId :", userId);
        await axiosInstance.delete(`/mypage/users/${userId}`);
        alert("회원 탈퇴가 완료되었습니다.");

        // 토큰 삭제 및 상태 초기화
        localStorage.removeItem("token");
        setUserInfo(null);
        setPassword('');
        setShowPasswordModal(false);
        navigate("/"); // 홈 페이지로 리다이렉트
        window.location.reload()
      } 
    } catch (error) {
      console.error("회원 탈퇴 중 오류 발생:", error);
      alert("매칭중에는 탈퇴할 수 없습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  

  if (error) return <div>{error}</div>;
  if (!userInfo) return <div>로딩 중...</div>;

  return (

    <div className="mypage-wrapper">
      {/* 사이드바 */}
        <Sidebar />
      {/* 마이페이지 메인 콘텐츠 */}
      <form className="mypage-container">
        <h1 className="mypage-title">마이페이지</h1>

          {/* 학생 정보 */}
          {userInfo.role === "student" && (
            <>
              <h2 className="role-title">교육실습생</h2>
              <div className="user-info">
                <span className="user-info-label">이름</span>
                
                  <span className="user-info-value">{userInfo.name}</span>
              </div>
              <div className="user-info">
                <span className="user-info-label">학번</span>
                {isEditing ? (
                  <input
                  className="mypageinput"
                    type="number"
                    value={editedInfo.studentNumber}
                    onChange={(e) => handleChange("studentNumber", e.target.value)}
                  />
                ) : (
                  <span className="user-info-value">{userInfo.studentNumber}</span>
                )}
              </div>
              <div className="user-info">
                <span className="user-info-label">전공</span>
                {isEditing ? (
                  <input
                  className="mypageinput"
                    type="text"
                    value={editedInfo.department}
                    onChange={(e) => handleChange("department", e.target.value)}
                  />
                ) : (
                  <span className="user-info-value">{userInfo.department}</span>
                )}
              </div>
              <div className="user-info">
                <span className="user-info-label">대학교</span>
                {isEditing ? (
                  <input
                  className="mypageinput"
                    type="text"
                    value={editedInfo.college}
                    onChange={(e) => handleChange("college", e.target.value)}
                  />
                ) : (
                  <span className="user-info-value">{userInfo.college}</span>
                )}
              </div>
              <div className="user-info">
                <span className="user-info-label">실습학교</span>
                {isEditing ? (
                  <input
                  className="mypageinput"
                    type="text"
                    value={editedInfo.schoolName}
                    onChange={(e) => handleChange("schoolName", e.target.value)}
                  />
                ) : (
                  <span className="user-info-value">{userInfo.schoolName}</span>
                )}
              </div>
              <div className="user-info">
                <span className="user-info-label">과목</span>

                <span className="user-info-value">{userInfo.subject}</span>
              </div>
              <div className="user-info">
                <span className="user-info-label">이메일</span>
                {isEditing ? (
                  <input
                  className="mypageinput"
                    type="text"
                    value={editedInfo.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                ) : (
                  <span className="user-info-value">{userInfo.email}</span>
                )}
              </div>
              <div className="user-info">
                <span className="user-info-label">핸드폰번호:</span>
                {isEditing ? (
                  <input
                  className="mypageinput"
                    type="text"
                    value={editedInfo.phoneNumber}
                    onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  />
                ) : (
                  <span className="user-info-value">{userInfo.phoneNumber}</span>
                )}
              </div>
            </>
          )}

          {/* 교사 정보 */}
          {userInfo.role === "teacher" && (
            <>
              <h2 className="role-title">담당교사</h2>
              <div className="user-info">
                <span className="user-info-label">이름</span>
                
                  <span className="user-info-value">{userInfo.name}</span>
              </div>
              <div className="user-info">
                <span className="user-info-label">소속학교</span>
                {isEditing ? (
                  <input
                  className="mypageinput"
                    type="text"
                    value={editedInfo.schoolName}
                    onChange={(e) => handleChange("schoolName", e.target.value)}
                  />
                ) : (
                  <span className="user-info-value">{userInfo.schoolName}</span>
                )}
              </div>
              <div className="user-info">
                <span className="user-info-label">사무실번호</span>
                {isEditing ? (
                  <input
                  className="mypageinput"
                    type="text"
                    value={editedInfo.officeNumber}
                    onChange={(e) => handleChange("officeNumber", e.target.value)}
                  />
                ) : (
                  <span className="user-info-value">{userInfo.officeNumber}</span>
                )}
              </div>
              <div className="user-info">
                <span className="user-info-label">담당과목</span>

                  <span className="user-info-value">{userInfo.subject}</span>

              </div>
              <div className="user-info">
                <span className="user-info-label">이메일</span>
                {isEditing ? (
                  <input
                  
                    className="mypageinput"
                    type="text"
                    value={editedInfo.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                ) : (
                  <span className="user-info-value">{userInfo.email}</span>
                )}
              </div>
              <div className="user-info">
                <span className="user-info-label">핸드폰번호</span>
                {isEditing ? (
                  <input
                    className="mypageinput"
                    type="text"
                    value={editedInfo.phoneNumber}
                    onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  />
                ) : (
                  <span className="user-info-value">{userInfo.phoneNumber}</span>
                )}
              </div>
            </>
          )}

         {/* 버튼 */}
         <div className="action-buttons">
          {isEditing ? (
            <>
              <button className="mypage-button" type="button" onClick={handleSave}>
                저장
              </button>
              <button className="mypage-button" type="button" onClick={() =>{ 
                setIsEditing(false);
                setEditedInfo(userInfo);
                }} 
              >
                취소
              </button>
            </>
          ) : (
            <button className="mypage-button" type="button" onClick={() => setIsEditing(true)}>
              수정
            </button>
          )}
            <button className="mypage-button" onClick={handleDelete}>회원탈퇴</button>
        </div>
      </form>
          {/* 비밀번호 입력 모달 */}
            {showPasswordModal && (
              <div className="password-modal">
                <h3>비밀번호를 입력하세요</h3>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호"
                />
                  <button onClick={handlePasswordSubmit} disabled={isLoading}>
                    {isLoading ? "탈퇴 중..." : "탈퇴"}
                  </button>
                  <button onClick={() => setShowPasswordModal(false)}>취소</button>
              </div>
            )}

    </div>
  );
};

export default MyPage;
