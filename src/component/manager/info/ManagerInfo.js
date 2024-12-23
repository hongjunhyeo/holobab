import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';

import "./ManagerInfo.css";

const BASE_URL = "http://localhost:8090/api/managerInfo";

const ManagerInfo = () => {
  const [managerInfo, setManagerInfo] = useState(null);
  const [userSub, setUserSub] = useState(null); // sub 값을 저장
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onClickModify = () => {
    navigate("/managerInfoModify");
  }

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

        setUserSub(sub);

        // 배열을 순회하며 URL을 동적으로 설정
        let url = '';
        if (roles.includes("ROLE_COLLEGE_MANAGER")) {
          url = `${BASE_URL}/college/${userId}`;
        } else if (roles.includes("ROLE_SCHOOL_MANAGER")) {
          url = `${BASE_URL}/school/${userId}`;
        } else {
          throw new Error('지원되지 않는 역할입니다.');
        }

        const response = await axios.get(url);
        setManagerInfo(response.data);
      } catch (err) {
        console.error('관리자 정보 가져오기 오류:', err);
        setError(err.message || '매니저 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchManagerInfo();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!managerInfo) return <p>매니저 정보를 찾을 수 없습니다.</p>;

  return (
    <div className="managerInfo-wrapper">
        <Sidebar />
        <form className='managerInfo-container'>
          <h1 className='managerInfo-title'>마이페이지</h1>
            <div className="user-info">
              <span className='user-info-label'>아이디</span>
              <span>{userSub}</span>
            </div>
            <div className="user-info">
              <span className='user-info-label'>주소</span>
              <span className='user-info-value'>{managerInfo.address || '정보 없음'}</span>
            </div>
            <div className="user-info">
              <span className='user-info-label'>사무실 번호</span>
              <span className='user-info-value'>{managerInfo.officeNumber || '정보 없음'}</span>
            </div>
            {managerInfo.schoolName && 
              <div className='user-info'>
                <span className='user-info-label'>School Name</span>
                <span className='user-info-value'>{managerInfo.schoolName}</span>
              </div>
            }
            {managerInfo.college && 
              <div className='user-info'>
                <span className='user-info-label'>College</span>
                <span className='user-info-value'>{managerInfo.college}</span>
              </div>
            }
            
            <div className="action-buttons">
              <button onClick={onClickModify}>수정하기</button>
            </div>
        </form>
    </div>
  );
};

export default ManagerInfo;