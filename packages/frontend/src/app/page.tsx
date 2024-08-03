"use client";

import { ServiceCallers } from "@/services/serviceCallers";
import { useEffect } from "react";
import styles from "./page.module.scss";

export default function Home() {
  const callOnBackend = async () => {
    ServiceCallers.health.ready({});
  };

  useEffect(() => {
    callOnBackend();
  }, []);

  return <div className={styles.entryPoint}>Hello world!</div>;
}
