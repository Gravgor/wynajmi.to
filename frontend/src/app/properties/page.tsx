import PropertiesListing from "@/views/PropertiesListing";
import { Suspense } from "react";

export default function Page() {
  return <Suspense fallback={<div>Loading...</div>}>
    <PropertiesListing />
  </Suspense>
}
