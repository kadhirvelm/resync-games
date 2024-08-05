import AvailableMaps from "@/components/AvailableMaps";
import styles from "./page.module.scss";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div className={styles.entryPoint}>
      <Suspense fallback={"Loading maps..."}>
        <AvailableMaps />
      </Suspense>
    </div>
  );
}
