import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./Sidebar.css";
import axiosInstance from "./axiosInstance";

const Sidebar = () => {
  const [isMatchingAllowed, setIsMatchingAllowed] = useState(false);
  const [decoded, setDecoded] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // 사이드바 상태 관리

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setDecoded(decodedToken);

        // Spring Boot API 호출
        axiosInstance
          .get(`/matching/check/${decodedToken.userId}`)
          .then((response) => {
            setIsMatchingAllowed(response.data);
          })
          .catch((error) => {
            console.error("API 호출 오류:", error);
          });
      } catch (error) {
        console.error("토큰 디코딩 오류:", error);
      }
    }
  }, []);

  if (!decoded) {
    return null;
  }

  const userId = decoded.userId;
  const userRole = decoded.roles;

  const handleRestrictedClick = () => {
    alert("매칭부터 하십시오.");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // 사이드바 열고 닫기
  };

  return (
    <div className={`sidebar-wrapper`}>
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-content">

        {/* Sidebar 내용 */}
        {userRole.includes("ROLE_TEACHER") || userRole.includes("ROLE_STUDENT") ? (
          <div>
            <ul>
              <li>
                <Link to="/mypage">내정보</Link>
              </li>
              {isMatchingAllowed.isMatched ? (
                <ul>
                  <li>
                    <Link to="/MatchInfo">매칭</Link>
                  </li>
                  <li>
                    <Link to="/practice">실습일지</Link>
                  </li>
                  <li>
                    <Link to="/class">수업일지</Link>
                  </li>
                  <li>
                    <Link to="/operation">학급운영일지</Link>
                  </li>
                  <li>
                    <Link to="/union">교직실무일지</Link>
                  </li>
                  <li>
                    <Link to="/rating">평가</Link>
                  </li>
                  <li>
                    {userRole.includes("ROLE_TEACHER") ? (
                      <>
                        <Link to="/TeacherAttendanceApproval">출석승인</Link>
                        <Link to="/TeacherMatchedStudentsAttendancePage">출석현황</Link>
                      </>
                    ) : (
                      <Link to="/AttendanceStatus">출석현황</Link>
                    )}
                  </li>
                  <li>
                    <Link to="/calendar">일정</Link>
                  </li>
                </ul>
              ) : (
                <ul>
                  <li>
                    {userRole.includes("ROLE_STUDENT") ? (
                      <Link to="/studentPage">매칭</Link>
                    ) : (
                      <Link to="/teacherPage">매칭</Link>
                    )}
                  </li>
                  {["실습일지", "수업일지", "학급운영일지", "교직실무일지", "평가", "출석", "출석현황", "일정"].map(
                    (item, index) => (
                      <li key={index}>
                        <Link
                          to="#"
                          onClick={handleRestrictedClick}
                          className="disabled-link"
                        >
                          {item}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              )}
            </ul>
          </div>
        ) : userRole.includes("ROLE_PROFESSOR") ? (
          <div>
            <ul>
              <li>
                <Link to="/mypage">마이페이지</Link>
              </li>
              <li>
                <Link to="/MatchInfo">매칭관리</Link>
              </li>
              <li>
                <Link to="/Practice">실습일지</Link>
              </li>
              <li>
                <Link to="/class">수업일지</Link>
              </li>
              <li>
                <Link to="/operation">학급운영일지</Link>
              </li>
              <li>
                <Link to="/union">교직실무일지</Link>
              </li>
            </ul>
          </div>
        ) : userRole.includes("ROLE_ADMIN") ? (
          <div>
            <ul>
              <li>
                <Link to="/admin/memberManagement">회원관리</Link>
              </li>
              <li>
                <Link to="/AdminMatches">매칭관리</Link>
              </li>
              <li>
                <Link to="/Practice">실습일지</Link>
              </li>
              <li>
                <Link to="/class">수업일지</Link>
              </li>
              <li>
                <Link to="/operation">학급운영일지</Link>
              </li>
              <li>
                <Link to="/union">교직실무일지</Link>
              </li>
              <li>
                <Link to="/Notice">공지사항</Link>
              </li>
              <li>
                <Link to="/Gallery">갤러리</Link>
              </li>
              <li>
                <Link to="/Form">양식</Link>
              </li>
              <li>
                <Link to="/Reference">참고자료</Link>
              </li>
              <li>
                <Link to="/FAQ">F&A 자주 묻는 질문</Link>
              </li>
              <li>
                <Link to="/FAQ">F&A 시스템 건의사항</Link>
              </li>
              <li>
                <Link to="/rating">평가</Link>
              </li>
              <li>
                <Link to="/calendar">일정</Link>
              </li>
            </ul>
          </div>
        ) : userRole.includes("ROLE_SCHOOL_MANAGER") || userRole.includes("ROLE_COLLEGE_MANAGER") ? (
          <div>
            <ul>
              <li>
                <Link to="/managerInfo">마이페이지</Link>
              </li>
              <li>
                <Link to="/Form">양식 게시판</Link>
              </li>
              <li>
                <Link to="/Reference">참고자료 게시판</Link>
              </li>
              <li>
                <Link to="/FAQ">자주묻는 질문</Link>
              </li>
              <li>
                <Link to="/Notice">공지사항</Link>
              </li>
              <li>
                <Link to="/Gallery">갤러리</Link>
              </li>
              <li>
                <Link to="/matchcheck">매칭정보</Link>
              </li>
              <li>
                <Link to="/listmgmt">명단관리</Link>
              </li>
              <li>
                <Link to="/calendar">일정</Link>
              </li>
            </ul>
          </div>
        ) : (
          <p>권한없음</p>
        )}
      </div>
    </div>
    <button className="sidebar-toggle" onClick={toggleSidebar}>
      {isSidebarOpen ? "<<" : ">>"}
  </button>
</div>

  );
};

export default Sidebar;
