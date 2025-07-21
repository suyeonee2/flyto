"use client";

import dynamic from "next/dynamic";

const RushBodyResult = dynamic(() => import("./RushBodyResult"), {
  ssr: false,
});

export default function Page() {
  return <RushBodyResult />;
}
