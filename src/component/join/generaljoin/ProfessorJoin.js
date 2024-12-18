import React, { useState, useEffect  } from "react";

function ProfessorJoin({ onChange, resetSignal  }) {
    const initialFormData = {
        userId: '',
        password: '',
        passwordCheck: '',
        name: '',
        email: '',
        phoneNumber: '',
        officeNumber: '',
        college: '',
        department: ''
    };

    const [formData, setFormData] = useState(initialFormData);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            const newFormData = { ...prevData, [name]: value };
            onChange(newFormData);  // 부모 컴포넌트로 데이터 전달
            return newFormData;
        });
    };

    useEffect(() => {
        if (resetSignal) {
            setFormData(initialFormData);
        }
    }, [resetSignal]);

    return (
        <div>
    

            <input
                className="inputbox"
                type="text"
                name="userId"
                placeholder="아이디를 입력해 주세요"
                value={formData.userId}
                onChange={handleChange}
            />
            <br />
            <input
                className="inputbox"
                type="password"
                name="password"
                placeholder="비밀번호"
                value={formData.password}
                onChange={handleChange}
            />
            <br />
            <input
                className="inputbox"
                type="password"
                name="passwordCheck"
                placeholder="비밀번호 확인"
                value={formData.passwordCheck}
                onChange={handleChange}
            />
            <br />
            <input
                className="inputbox"
                type="text"
                name="name"
                placeholder="이름"
                value={formData.name}
                onChange={handleChange}
            />
            <br />

            <input
                className="inputbox"
                type="email"
                name="email"
                placeholder="이메일주소"
                value={formData.email}
                onChange={handleChange}
            />
            <br />
            <input
                className="inputbox"
                type="tel"
                name="phoneNumber"
                placeholder="휴대전화번호"
                value={formData.phoneNumber}
                onChange={handleChange}
            />
            
            <br />
            <input
                className="inputbox"
                type="text"
                name="officeNumber"
                placeholder="사무실 번호"
                value={formData.officeNumber}
                onChange={handleChange}
            />
                        <br />
            <input
                className="inputbox"
                type="text"
                name="college"
                placeholder="대학교"
                value={formData.college}
                onChange={handleChange}
            />
            <br />
            <input
                className="inputbox"
                type="text"
                name="department"
                placeholder="학과"
                value={formData.department}
                onChange={handleChange}
            />
        </div>
    );
}

export default ProfessorJoin;
