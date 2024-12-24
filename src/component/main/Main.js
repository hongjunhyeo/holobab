import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import "./Main.css";
import axiosInstance from '../axiosInstance';

const Main = () => {
    const [referenceList, setReferenceList] = useState([]);
    const [noticeList, setNoticeList] = useState([]);
    const [calendarList, setCalendarList] = useState([]);
    const [galleries, setGalleries] = useState([]);
    const navigate = useNavigate();

    const ReferenceDetailClick = (boardID) => {
        navigate(`/Reference/ReferenceBoardDetail/${boardID}`);
    };

    const NoitceDetailClick = (boardID) => {
        navigate(`/Notice/NoticeBoardDetail/${boardID}`);
    };

   // 참고자료 리스트 불러오기
  const getReferenseList = async () => {
    try {
      const response = await axiosInstance.get(
        "/reference/mainList"
      );
      setReferenceList(response.data);
    } catch (error) {
      console.error("참고자료게시판 불러오기실패:", error);
    }
  };

  // 공지사항 리스트 불러오기
  const getNoticeList = async () => {
    try {
      const response = await axiosInstance.get(
        "/notice/mainList"
      );
      setNoticeList(response.data);
    } catch (error) {
      console.error("참고자료게시판 불러오기실패:", error);
    }
  };

  // 최신 갤러리 리스트 불러오기
  const getGalleryList = async () => {
    try {
        const response = await axiosInstance.get(
            "/api/gallery/recent" // 최신 갤러리 5개를 가져오는 API 호출
        );
        setGalleries(response.data.slice(0, 4));
    } catch (error) {
        console.error("갤러리 불러오기 실패:", error);
    }
  };

  // 최신 일정 리스트 불러오기
  const getCalendarList = async () => {
    try {
        const response = await axiosInstance.get(
            "/api/calendar"
        );
        setCalendarList(response.data);
    } catch (error) {
        console.error("갤러리 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    getReferenseList();
    getNoticeList();
    getGalleryList();
    getCalendarList();
},[]);
    
    return(
        <div className="Main">
            <div className="gallery">
                <div className="gallery-title">
                    <strong>갤러리</strong>
                </div>
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
            </div>
            <div className="groupBox">
                <div className="Box1">
                    <div>
                        <p>공지사항</p>
                        <Link to="/notice" className="text-link">더보기</Link>
                    </div>
                    <div>
                        <ul className="notice-list">
                            {noticeList.length === 0 ? (
                                <li className="no-data">게시글이 없습니다.</li>
                            ) : (
                                noticeList.map((board) => (
                                    <li
                                    key={board.boardID} 
                                    onClick={() => NoitceDetailClick(board.boardID)}
                                    className="notice-item"
                                    >
                                    <strong>{board.title}</strong>  
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
                <div className="Box2">
                    <div className="calendar-list">
                        <p>이달의 일정</p>
                        <Link to="/calendar" className="text-link">더보기</Link>
                    </div>
                    <div>
                        {calendarList.length === 0 ? (
                            <li className="no-data">일정이 없습니다</li>
                        ) : (
                            <ul>
                                {calendarList.map((calendar) => (
                                    <li key={calendar.id} className="calendar-item">
                                        <strong>{calendar.title}</strong>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="Box3">
                    <div>
                        <h3>참고자료</h3>
                        <Link to="/reference" className="text-link">더보기</Link>
                    </div>
                    <div>
                        <ul className="notice-list">
                            {referenceList.length === 0 ? (
                                <li className="no-data">게시글이 없습니다.</li>
                            ) : (
                                referenceList.map((board) => (
                                    <li
                                    key={board.boardID} 
                                    onClick={() => ReferenceDetailClick(board.boardID)}
                                    className="notice-item"
                                    >
                                    <strong>{board.title}</strong>  
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;