import React from "react";
import "./FieldInternshipOverview.css"; // 스타일을 위한 별도 CSS 파일

const FieldInternshipOverview = () => {
  return (
    <div className="field-internship-overview-container">
      <h1 className="title">한눈에 보는 현장실습학기제</h1>
      <p className="description">
        현장실습학기제는 학생들이 산업 현장에서 실제 경험을 쌓으며 학습한 이론을 실제 업무에 적용할 수 있는 기회를 제공합니다. 
        이 제도는 학생들이 더 나은 직무 능력을 함양하고, 실질적인 진로 설계에 도움이 됩니다.
      </p>

      <div className="program-structure">
        <h2>프로그램 구조</h2>
        <ul>
          <li>기업, 기관, 단체 등 다양한 실습처와 연결</li>
          <li>실습 중 직무 관련 교육 및 멘토링 제공</li>
          <li>학교 학점과 병행하여 실습 학점 인정</li>
          <li>참여 학생에게 맞춤형 실습 프로그램 제공</li>
        </ul>
      </div>

      <div className="how-it-works">
        <h2>참여 절차</h2>
        <ol>
          <li>학교 포털 사이트를 통한 신청</li>
          <li>학생과 실습 기관 간의 매칭</li>
          <li>사전 교육 및 준비 과정</li>
          <li>현장에서 실습 수행</li>
          <li>실습 종료 후 평가 및 학점 인정</li>
        </ol>
      </div>

      <div className="eligibility">
        <h2>참여 대상</h2>
        <p>
          현장실습학기제는 주로 3학년 이상, 전공 필수 과목을 이수한 학생들을 대상으로 하며, 학교와 실습 기관의 승인이 필요합니다.
          실습 기관과의 매칭 후 진행됩니다.
        </p>
      </div>

      <div className="additional-info">
        <h2>기타 정보</h2>
        <p>
          실습 기간과 지원 내용은 학교마다 상이할 수 있으며, 자세한 사항은 학교의 학사 공지나 관련 부서에 문의하시기 바랍니다.
        </p>
      </div>
    </div>
  );
};

export default FieldInternshipOverview;
