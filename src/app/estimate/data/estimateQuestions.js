const estimateQuestions = [
  {
    id: 1,
    question:
      "큐레이션 콘텐츠로 제작하고 싶은 제품 또는 서비스를 선택해주세요.",
    type: "single",
    options: [
      "뷰티",
      "헬스 / 웰니스",
      "식품 / 음료",
      "패션",
      "전자 / IT",
      "교육 / 도서",
      "생활 / 리빙",
      "기타",
    ],
  },
  {
    id: 2,
    question: "원하는 스타일을 골라주세요",
    type: "single",
    options: ["인포그래픽 / 2D 일러스트", "3D 그래픽", "인터랙티브 3D", "기타"],
  },
  {
    id: 3,
    question: "생각해두신 큐레이션 방식이 있으신가요?",
    type: "single",
    options: [
      "브랜드의 무드를 중심으로",
      "고객의 상황/성향을 기반으로",
      "색상, 계절, 스타일 등 특정 기준 중심으로",
      "제품 라인업 또는 시리즈 전체 중심으로",
      "아직 잘 모르겠어요",
    ],
  },
  {
    id: 4,
    question: "희망하는 제작 일정이 있으신가요?",
    type: "single",
    options: [
      "2주 이내",
      "3~4주 내",
      "1~2개월 내",
      "여유 있음 (2개월 이상)",
      "아직 미정",
    ],
  },
  {
    id: 5,
    question: "대략적인 예산 범위를 알려주세요",
    type: "single",
    options: [
      "100만 원 미만",
      "100~200만 원",
      "200~300만 원",
      "300~500만 원",
      "협의 예정",
    ],
  },
  {
    id: 6,
    question: "연락 가능한 이메일 또는 연락처를 남겨주세요",
    type: "input",
  },
];

export default estimateQuestions;
