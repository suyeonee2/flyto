export function matchColorType(answers) {
  let tone = answers.q1; // q1: 퍼스널컬러
  const depth = answers.q3; // q3: 어울리는 컬러
  const style = answers.q4; // q4: 메이크업 스타일
  const fashionStyle = answers.q5; // q5: 옷 분위기 (tone 보완용)

  // tone 보완 로직
  if (tone === "neutral") {
    const toneMap = {
      pure: "cool",
      chic: "cool",
      playful: "warm",
      bold: "warm",
    };

    const inferredTone1 = toneMap[style];
    const inferredTone2 = toneMap[fashionStyle];

    if (inferredTone1 === inferredTone2) {
      tone = inferredTone1;
    } else {
      tone = "neutral";
    }
  }

  return `${tone}_${depth}_${style}`;
}
