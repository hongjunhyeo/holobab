import { useState, useEffect } from "react";
import './UploadBox.css';

const FileInfo = ({ uploadedInfo }) => (
    <ul className="preview_info">
        {Object.entries(uploadedInfo).map(([key, value]) => (
            <li key={key}>
                <span className="info_key">{key}</span>
                <span className="info_value">{value}</span>
            </li>
        ))}
    </ul>
);


const Logo = () => (
    <svg className="icon" x="0px" y="0px" viewBox="0 0 24 24">
        <path fill="transparent" d="M0,0h24v24H0V0z"/>
        <path fill="#000" d="M20.5,5.2l-1.4-1.7C18.9,3.2,18.5,3,18,3H6C5.5,3,5.1,3.2,4.8,3.5L3.5,5.2C3.2,5.6,3,6,3,6.5V19  c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V6.5C21,6,20.8,5.6,20.5,5.2z M12,17.5L6.5,12H10v-2h4v2h3.5L12,17.5z M5.1,5l0.8-1h12l0.9,1  H5.1z"/>
    </svg>
);

function UploadBox({ onUpload, value }) {
    const [isActive, setActive] = useState(false);
    const [uploadedInfo, setUploadedInfo] = useState(null);

    const handleDragStart = () => setActive(true);
    const handleDragEnd = () => setActive(false);
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const setFileInfo = (file) => {
        if (file) {
            const { name, size: byteSize, type } = file;
            const size = (byteSize / (1024 * 1024)).toFixed(2) + 'MB';
            setUploadedInfo({ name, size, type });
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setActive(false);
    
        const file = event.dataTransfer.files[0];
        if (file) {
            setFileInfo(file);
            if (onUpload) {
                onUpload(file);  // 부모 컴포넌트로 파일 전송
            }
        }
    };

    const handleUpload = ({ target }) => {
        const file = target.files[0];
        if (file) {
            setFileInfo(file);
            if (onUpload) {
                onUpload(file);  // 부모 컴포넌트로 파일 전송
            }
        }
    };

    // 부모 컴포넌트에서 proofData가 null로 전달되면 파일 정보 초기화
    useEffect(() => {
        if (value === null) {
            setUploadedInfo(null);
        }
    }, [value]);

    return (
        <label
            className={`preview${isActive ? ' active' : ''}`}
            onDragEnter={handleDragStart}
            onDragOver={handleDragOver}
            onDragLeave={handleDragEnd}
            onDrop={handleDrop}
        >
            <input type="file" className="file" onChange={handleUpload} />
            
            {uploadedInfo ? (
                <FileInfo uploadedInfo={uploadedInfo} />
            ) : (
                <>
                    <Logo />
                    <p className="preview_msg">클릭 혹은 파일을 이곳에 드롭하세요.</p>
                    <p className="preview_desc">파일당 최대 3MB</p>
                </>
            )}
        </label>
    );
}

export default UploadBox;
