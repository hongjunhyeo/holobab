import React from "react";
import "./CentralSupport.css"; // 스타일을 위한 별도 CSS 파일

const CentralSupport = () => {
  return (
    <div className="central-support-container">
      <h1 className="title">현장실습학기제 중앙지원소개</h1>
      <p className="description">
        현장실습학기제는 학생들이 산업 현장에서 실무 경험을 쌓을 수 있도록 중앙에서 다양한 지원을 제공하는 제도입니다.
        이 프로그램은 실습을 통해 학생들이 더 나은 직무 능력을 갖추고, 취업 기회를 향상시킬 수 있도록 돕습니다.
      </p>

      <div className="services">
        <h2>주요 지원 서비스</h2>
        <ul>
          <li>실습 기관과의 연결 지원</li>
          <li>현장실습학기제 관련 교육 및 워크숍 제공</li>
          <li>멘토링 프로그램 운영</li>
          <li>학생과 기업의 피드백을 통한 프로그램 개선</li>
        </ul>
      </div>

      <div className="benefits">
        <h2>참여 학생 혜택</h2>
        <ol>
          <li>실습 기관과의 연계로 직무 능력 향상</li>
          <li>멘토링을 통해 전문적인 피드백 제공</li>
          <li>취업 연계 및 네트워킹 기회 제공</li>
          <li>교육과 실습 병행으로 학점 인정</li>
        </ol>
      </div>

      <div className="how-to-apply">
        <h2>지원 방법</h2>
        <p>
          중앙 지원에 참여하려면, 학교의 포털을 통해 신청서를 제출하고, 실습 기관과의 매칭 후 지원 절차를 완료해야 합니다.
          자세한 사항은 학교의 지원 공고를 확인하시기 바랍니다.
        </p>
      </div>

      <div className="additional-info">
        <h2>기타 정보</h2>
        <p>
          중앙지원은 각 학교와 협력하여 다양한 실습처와 매칭을 진행하며, 지원 금액 및 절차는 학교마다 다를 수 있습니다. 
          더 많은 정보는 학교의 학사 공지에서 확인할 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default CentralSupport;
