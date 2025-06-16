export function matchColorType(answers) {
  const score = {};

  answers.forEach((value) => {
    if (!score[value]) score[value] = 0;
    score[value]++;
  });

  // 그룹별 키 설정
  const tones = ["cool", "warm", "neutral"];
  const depths = ["light", "deep", "medium"];
  const usecases = ["daily", "bold", "point"];

  const getTop = (group) =>
    group
      .map((key) => [key, score[key] || 0])
      .sort((a, b) => b[1] - a[1])[0][0];

  const tone = getTop(tones);
  const depth = getTop(depths);
  const usecase = getTop(usecases);

  return `${tone}-${depth}-${usecase}`;
}
