import { useEffect, useState } from "react";
import axios from "axios";

const SchoolList = () => {
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [loadingTeachers, setLoadingTeachers] = useState(true);
    const [loadingStudents, setLoadingStudents] = useState(true);
    const [error, setError] = useState(null);

    // 선생님 리스트 가져오기
    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                setLoadingTeachers(true);
                const response = await axios.get("http://localhost:8090/api/listmanagement/teachers");
                console.log("Teachers Data: ", response.data);
                setTeachers(response.data);
            } catch (err) {
                console.error("Error fetching teachers data", err);
                setError("선생 정보를 불러오는 중 문제가 발생했습니다.");
            } finally {
                setLoadingTeachers(false);
            }
        };

        fetchTeachers();
    }, []);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                setLoadingStudents(true);
                const response = await axios.get("http://localhost:8090/api/listmanagement/students");
                console.log("Students Data: ", response.data);
                setStudents(response.data);
            } catch (err) {
                console.error("Error fetching students data", err);
                setError("학생 정보를 불러오는 중 문제가 발생했습니다.");
            } finally {
                setLoadingStudents(false);
            }
        };
        
            fetchStudents();
    }, []);

    return (
        <div>
            {/* 선생 리스트 */}
            <div>
                <p>선생님 목록</p>
                <ul>
                    {teachers.length > 0 ? (
                        teachers.map((teacher, index) => (
                        <li key={index}>
                            <strong>{teacher.name}</strong><br />
                            이메일: {teacher.email}<br />
                            학교: {teacher.schoolName}<br />
                            과목: {teacher.subject}
                        </li>
                        ))
                    ) : (
                    <li>선생님 정보가 없습니다.</li>  // 선생님 정보가 없을 경우 메시지 표시
                    )}
                </ul>
            </div>
            {/* 학생 리스트가 뜨는 곳 */}
            <div>
                <p>학생 목록</p>
                <ul>
                    {students.length > 0 ? (
                        students.map((student, index) => (
                            <li key={index}>
                                <strong>{student.name}</strong><br />
                                이메일: {student.email}<br />
                                학교: {student.schoolName}<br />
                            </li>
                        ))
                    ) : (
                    <li>학생 정보가 없습니다.</li>
                    )}
                </ul>
            </div>
            {/* 선생 리스트 표시하는 곳 */}
            <div>

            </div>
        </div>
    );
};

export default SchoolList;