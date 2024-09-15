import AvailableGames from "@/components/AvailableGames";
import { Suspense } from "react";

export default async function Home() {
  return (
    <Suspense fallback={"Loading games..."}>
      <AvailableGames />
    </Suspense>
  );
}
