import AvailableGames from "@/components/AvailableGames";
import { Suspense } from "react";
import styles from "./page.module.scss";

export default async function Home() {
  return (
    <div className={styles.entryPoint}>
      <Suspense fallback={"Loading games..."}>
        <AvailableGames />
      </Suspense>
    </div>
  );
}
