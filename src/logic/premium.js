import mappingData from "../app/examples/romand_juicyTint/data/Mapping.json";

// 영어 id → 한글 label 매핑 테이블
const categoryMap = {
  pink: "핑크",
  coral: "코랄",
  brick: "브릭",
  plum: "플럼",
  nude: "누디",
  red: "레드",
};

const subcategoryMap = {
  mlbb: "MLBB",
  mauvepink: "모브핑크",
  nudepink: "누디핑크",
  peachcoral: "피치코랄",
  pinkcoral: "핑크코랄",
  mutedcoral: "뮤트코랄",
  lightcoral: "밝은코랄",
  nudiorange: "누디오렌지",
  naturalredbrown: "내추럴레드브라운",
  redbrick: "레드브릭",
  mutedbrick: "뮤트브릭",
  deepredbrick: "딥레드브릭",
  chillybrick: "칠리브릭",
  plumred: "플럼레드",
  pinkred: "핑크레드",
  creamyred: "크리미레드",
  cherryred: "체리레드",
  freshred: "청량레드",
  nudibiege: "누디베이지",
};

export function premium(answers) {
  const q1 = answers.q1;
  const q2 = answers.q2;

  if (!q1 || !q2) return { mainId: null, subId: null };

  const cat = categoryMap[q1];
  const subcat = subcategoryMap[q2];

  if (!cat || !subcat) return { mainId: null, subId: null };

  const key = `${cat}___${subcat}`;
  const matched = mappingData[key] || [];

  // 무작위로 섞고 최대 2개만 가져오기
  const shuffled = [...matched].sort(() => Math.random() - 0.5);
  const mainId = shuffled[0] || null;
  const subId = shuffled[1] || null;

  return { mainId, subId };
}
