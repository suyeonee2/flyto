import { Suspense } from "react";
import EstimateForm from "./EstimateForm";

export default function EstimatePage() {
  return (
    <Suspense>
      <EstimateForm />
    </Suspense>
  );
}
