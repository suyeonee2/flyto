import FweeVolumingMain from "./FweeVolumingMain";
import TestList from "../TestList.json";

export async function generateMetadata() {
  const currentTestId = "fwee_voluming";
  const testData = TestList.find((test) => test.id === currentTestId);

  if (!testData) {
    return {
      title: "테스트를 찾을 수 없습니다",
      description: "해당 테스트가 존재하지 않습니다.",
    };
  }

  const siteName = "필토";
  const fullTitle = `${testData.desc} | ${siteName}`;

  return {
    title: fullTitle,
    description: testData.desc,
    openGraph: {
      title: fullTitle,
      description: testData.desc,
      images: [
        {
          url: testData.image,
          alt: testData.title,
        },
      ],
      url: testData.path,
    },
    twitter: {
      title: fullTitle,
      description: testData.desc,
      images: [
        {
          url: testData.image,
        },
      ],
    },
  };
}

export default function Page() {
  return <FweeVolumingMain />;
}
