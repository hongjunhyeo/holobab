import React from "react";
import "./OperationModel.css"; // 스타일을 위한 별도 CSS 파일

const OperationModel = () => {
  return (
    <div className="operation-model-container">
      <h1 className="title">운영 모형</h1>
      <p className="description">
        현장학기실습제의 운영 모형은 학생과 기업, 학교가 함께 협력하여 실질적인 실무 교육과 학업의 균형을 이루는 구조를 제공합니다.
        이를 통해 학습과 실습을 통합하며, 학생들에게 체계적인 경험과 기회를 제공합니다.
      </p>
      <div className="model-structure">
        <h2>운영 구조</h2>
        <ul>
          <li>학생: 현장 실습 참여 및 학습 성과 도출</li>
          <li>기업: 실습 제공 및 멘토링</li>
          <li>학교: 실습 관리 및 학점 인정</li>
        </ul>
      </div>
      <div className="steps">
        <h2>운영 단계</h2>
        <ol>
          <li>사전 준비: 실습처 선정 및 매칭</li>
          <li>실습 수행: 지정된 기간 동안 현장 실습</li>
          <li>성과 평가: 실습 결과 평가 및 피드백</li>
          <li>사후 관리: 실습 보고서 제출 및 학점 부여</li>
        </ol>
      </div>
      <div className="roles-responsibilities">
        <h2>주요 역할 및 책임</h2>
        <ul>
          <li>학생: 책임감 있는 태도로 실습 수행 및 보고</li>
          <li>기업: 학생에게 적절한 업무 제공 및 관리</li>
          <li>학교: 실습 전반의 관리 및 지원</li>
        </ul>
      </div>
      <div className="advantages">
        <h2>운영 모형의 장점</h2>
        <p>
          학교, 기업, 학생 간의 긴밀한 협력을 통해, 실질적이고 지속 가능한 실습 환경을 제공합니다. 또한, 참여 학생의 역량 강화와 기업의 우수 인재 발굴 기회를 동시에 충족시킵니다.
        </p>
      </div>
    </div>
  );
};

export default OperationModel;
