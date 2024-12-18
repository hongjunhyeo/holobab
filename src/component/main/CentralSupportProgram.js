import React from "react";
import "./CentralSupportProgram.css"; // 스타일을 위한 별도 CSS 파일

const CentralSupportProgram = () => {
  return (
    <div className="central-support-program-container">
      <h1 className="title">중앙지원센터 사업</h1>
      <p className="description">
        중앙지원센터는 현장실습학기제를 통해 학생들에게 다양한 지원을 제공하며, 이를 통해 학생들이 산업 현장에서 실무 경험을 쌓고,
        취업 가능성을 높일 수 있도록 돕습니다. 중앙지원센터에서 제공하는 다양한 사업들을 소개합니다.
      </p>

      <div className="programs">
        <h2>주요 사업</h2>
        <ul>
          <li>산업체 연계 실습 지원</li>
          <li>학생 맞춤형 멘토링 프로그램</li>
          <li>취업 연계 및 채용 박람회 운영</li>
          <li>현장 실습 과정 관리 및 평가</li>
        </ul>
      </div>

      <div className="benefits">
        <h2>참여 학생 혜택</h2>
        <ol>
          <li>실습 기관과의 직접 연결을 통한 실무 경험 제공</li>
          <li>멘토링을 통한 직무 능력 강화</li>
          <li>채용 박람회를 통한 취업 기회 제공</li>
          <li>실습 후 평가를 통한 취업 연계 지원</li>
        </ol>
      </div>

      <div className="how-to-apply">
        <h2>참여 방법</h2>
        <p>
          중앙지원센터의 다양한 사업에 참여하려면, 학교의 포털 사이트를 통해 신청서를 제출하고, 해당 사업에 맞는 프로그램에
          등록해야 합니다. 자세한 사항은 학교의 공지 사항을 확인하시기 바랍니다.
        </p>
      </div>

      <div className="additional-info">
        <h2>기타 정보</h2>
        <p>
          각 사업에 대한 지원 금액과 참여 절차는 학교마다 다를 수 있으며, 프로그램 일정은 중앙지원센터의 안내에 따라 다를 수 있습니다.
          자세한 사항은 학교의 공식 사이트나 학사 공지를 확인해 주세요.
        </p>
      </div>
    </div>
  );
};

export default CentralSupportProgram;
