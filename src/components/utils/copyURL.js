export const copyURL = (url) => {
  if (navigator?.clipboard) {
    navigator.clipboard.writeText(url).then(() => {
      alert("링크가 복사되었습니다.");
    });
  } else {
    const t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = url;
    t.select();
    document.execCommand("copy");
    document.body.removeChild(t);
    alert("링크가 복사되었습니다.");
  }
};
