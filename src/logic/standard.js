import resultMapping from "../app/examples/lelabo_candle/data/resultMapping";

export function standard(answers) {
  const scoreMap = {};

  // resultMapping 배열을 돌면서 점수 누적
  resultMapping.forEach(({ id, match }) => {
    let score = 0;

    // 각 질문(q1~q4)에 대해 일치하는지 확인
    Object.entries(answers).forEach(([qKey, answer]) => {
      if (match[qKey] === answer) {
        score += 1;
      }
    });

    if (score > 0) {
      scoreMap[id] = score;
    }
  });

  // 점수 누적 결과 중 최대값 찾기
  const maxScore = Math.max(...Object.values(scoreMap));

  // 최고 점수를 가진 향 id들 필터링
  const topIds = Object.keys(scoreMap).filter(
    (id) => scoreMap[id] === maxScore
  );

  // 최고 점수 향들 중 랜덤 1개 선택
  const selected = topIds[Math.floor(Math.random() * topIds.length)];

  return selected;
}
