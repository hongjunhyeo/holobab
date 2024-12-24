import React, { useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import Modal from 'react-modal';
import axiosInstance from '../../axiosInstance';

const AddEventForm = ({ onEventAdded, onClose }) => {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const id = decodedToken.userId;
        const newEvent = {
            id,
            title,
            startDate,
            endDate,
            description,
        };

        axiosInstance.post('/api/calendar', newEvent, {
        })
            .then(response => { 
                onEventAdded(response.data); // 새로운 일정 추가
                alert('일정이 추가되었습니다.');
                onClose(); // 모달 닫기
            })
            .catch(error => {
                console.error("에러: ", error);
                alert('일정을 추가하는 중 오류가 발생했습니다.');
            });
    };

    return (
        <Modal
            isOpen={true}
            onRequestClose={onClose} // 모달 닫기
            contentLabel="일정 추가"
            ariaHideApp={false} // 리액트 모달 사용 시 필수 설정
            className="modal-content"
            overlayClassName="modal-overlay"
            >
            <h2>일정 추가</h2>
            <form onSubmit={handleSubmit}>
                <div>
                <label>제목</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="일정 제목을 입력하세요"
                    required
                />
                </div>
                <div>
                <label>시작 날짜</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                />
                </div>
                <div>
                <label>종료 날짜</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                />
                </div>
                <div>
                <label>설명</label>
                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="상세 일정을 입력하세요"
                />
                </div>
                <button type="submit">일정 추가</button>
            </form>
            <button className="close-modal" onClick={onClose}>닫기</button>
        </Modal>
    );
};

export default AddEventForm;