import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from 'react-modal';  // react-modal 임포트

import "./CollegeList.css";

const CollegeList = () => {
    const [department, setDepartment] = useState(""); // 기본 학과
    const [students, setStudents] = useState([]);
    const [type, setType] = useState("학생"); // 기본 대상: 학생
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null); // 선택한 학생 저장
    const [matchingTeachers, setMatchingTeachers] = useState([]); // 매칭된 교사 목록

    const handleSearch = async () => {
        try {
            let endpoint = "";
            if (type === "학생") {
                // 학생 검색: 학과명 (department)
                endpoint = `http://localhost:8090/api/listmanagement/searchByStudent?department=${department}`;
            } else if (type === "교수") {
                // 교수 검색: 학과명 (department)
                endpoint = `http://localhost:8090/api/listmanagement/searchByProfessor?department=${department}`;
            }

            const response = await axios.get(endpoint);
            setResults(response.data);
        } catch (err) {
            console.error("Error fetching data", err);
            setError("데이터를 불러오는 중 문제가 발생했습니다.");
        }
    };

    useEffect(() => {
        // 학과나 대상이 변경될 때마다 검색 자동 실행
        if (department) {
            handleSearch();
        }
    }, [department, type]); // 학과나 대상(type)이 변경될 때마다 검색 실행

    //학생 리스트 가져오기
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get("http://localhost:8090/api/listmanagement/students");
                console.log("Students Data: ", response.data);
                setStudents(response.data);
            } catch (err) {
                console.error("Error fetching students data", err);
                setError("학생 정보를 불러오는 중 문제가 발생했습니다.");
            }
        };
        
            fetchStudents();
    }, []);

    // 학생 선택 시 매칭된 교사 정보를 가져오는 함수
    const handleStudentSelect = async (studentId) => {
        setSelectedStudent(studentId); // 선택한 학생 ID 저장

        try {
            const response = await axios.get(`http://localhost:8090/api/listmanagement/teachersForstudent/${studentId}`);
            setMatchingTeachers(response.data); // 매칭된 교사 리스트 상태 업데이트
        } catch (err) {
            setError("매칭된 교사를 불러오는 중 문제가 발생했습니다.");
        }
    };

    return (
        <div className="CollegeList-wrapper">
            <h1 className="CollegeList-title">학과별 데이터 검색</h1>
            <div className="select-section">
                {/* 학과 선택 */}
                <div className="department-select">
                    <label>학과: </label>
                    <select value={department} onChange={(e) => setDepartment(e.target.value)}>
                        <option value="">--학과 선택--</option>
                        <option value="국어">국어</option>
                        <option value="영어">영어</option>
                        <option value="수학">수학</option>
                    </select>
                </div>

                {/* 대상 선택 */}
                <div className="search-student">
                    <label>검색 대상: </label>
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="학생">학생</option>
                        <option value="교수">교수</option>
                    </select>
                </div>
                {/* 검색 버튼 */}
                <button onClick={handleSearch}>검색</button>
            </div>
            

            {/* 검색 결과 출력 */}
            <div className="search-result">
                <h2>검색 결과</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {results.length === 0 ? (
                    <p>검색 결과가 없습니다.</p>
                ) : (
                    <ul>
                        {results.map((item, index) => (
                            <li key={index}>
                                {/* 조건에 따라 표시할 데이터를 다르게 설정 */}
                                {type === "학생" && `${item.name} (${item.email}, ${item.college})`}
                                {type === "교수" && `${item.name} (${item.email}, ${item.phoneNumber}, ${item.college})`}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {/* 학생 리스트 */}
            <div className="student-list">
                <h1>학생 목록</h1>
                <ul>
                    {students.length > 0 ? (
                    students.map((student) => (
                        <li
                            key={student.id}
                            onClick={() => handleStudentSelect(student.id)}
                        >
                            {student.name} - {student.email} - {student.college} - {student.phoneNumber}
                        </li>
                        ))
                    ) : (
                        <li>학생 정보가 없습니다.</li>
                    )}
                </ul>
            </div>
            {selectedStudent && (
                <div className="matchByTeacher">
                    <h2>{students.find((student) => student.id === selectedStudent)?.name} 학생의 매칭된 교사들</h2>
                    <ul className="teacher-detail">
                        {matchingTeachers.length > 0 ? (
                        matchingTeachers.map((teacher, index) => (
                            <li key={index}>
                                <span className="teacher-name"><strong>{teacher.name}</strong></span>
                                <span className="teacher-email">이메일: {teacher.email}</span>
                                <span className="teacher-school">학교: {teacher.schoolName}</span>
                                <span className="teacher-subject">과목: {teacher.subject}</span>
                            </li>
                            ))
                        ) : (
                            <li>매칭된 교사가 없습니다.</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CollegeList;