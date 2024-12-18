import React from "react";
import "./FieldInternship.css"; // 스타일을 위한 별도 CSS 파일

const FieldInternship = () => {
  return (
    <div className="field-internship-container">
      <h1 className="title">현장학기실습제란?</h1>
      <p className="description">
        현장학기실습제는 학생들이 실제 산업 현장에서 실무를 경험하며, 학업에서 배운 이론을 실질적으로 적용할 수 있도록 돕는 제도입니다.
        이를 통해 학생들은 직무 능력을 강화하고, 미래의 진로를 설계할 기회를 제공합니다.
      </p>
      <div className="features">
        <h2>주요 특징</h2>
        <ul>
          <li>산업체, 기관, 단체 등 다양한 실습처 제공</li>
          <li>현장 전문가와의 멘토링 기회</li>
          <li>학교 수업과 병행하여 실습 학점을 인정</li>
          <li>개인 역량에 맞는 맞춤형 실습 프로그램</li>
        </ul>
      </div>
      <div className="benefits">
        <h2>참여 학생 혜택</h2>
        <ol>
          <li>학점 인정: 실습 기간 동안 이수한 내용을 학점으로 인정</li>
          <li>실무 경험: 졸업 전 실제 업무 환경에 대한 경험 제공</li>
          <li>취업 연계: 우수 실습생은 실습 기관에 취업 기회를 얻을 가능성 증가</li>
          <li>대인관계 향상: 다양한 사람들과의 협업으로 커뮤니케이션 능력 향상</li>
        </ol>
      </div>
      <div className="eligibility">
        <h2>참여 대상</h2>
        <p>
          현장학기실습제는 3학년 이상의 재학생을 대상으로 하며, 전공 필수 과목을 일정 수준 이상 이수한 학생들에게 참여 기회가 주어집니다.
          학과와 학교의 승인 절차를 거쳐야 하며, 실습 기관과의 매칭이 필요합니다.
        </p>
      </div>
      <div className="process">
        <h2>신청 및 운영 절차</h2>
        <ol>
          <li>참여 신청: 학교 포털 사이트에서 신청</li>
          <li>매칭: 실습 기관과 학생 간의 매칭 진행</li>
          <li>사전 교육: 실습 전 기본 교육 실시</li>
          <li>실습 수행: 지정된 기간 동안 현장에서 실습</li>
          <li>평가 및 학점 인정: 실습 종료 후 평가를 통해 학점 부여</li>
        </ol>
      </div>
      <div className="additional-info">
        <h2>추가 정보</h2>
        <p>
          학교별로 실습 기간, 학점 인정 기준, 지원금 지급 여부 등이 다를 수 있으니, 자세한 사항은 학교의 학사 공지를 참고하세요.
        </p>
      </div>
    </div>
  );
};

export default FieldInternship;
