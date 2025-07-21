import data from "../app/examples/rush_body/data/resultMapping.json";

export function getMatchedResult(answers) {
  let bestMatch = null;
  let highestScore = -1;

  data.forEach((item) => {
    let score = 0;

    if (item.keywords.계열.includes(answers[0])) score += 1;
    if (item.keywords.무드.includes(answers[1])) score += 1;
    if (item.keywords.향.includes(answers[2])) score += 1;

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  });

  return bestMatch;
}
