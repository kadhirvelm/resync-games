"use client";

import { useEffect } from "react";
import styles from "./page.module.scss";
import { ServiceCallers } from "@/services/getServices";

export default function Home() {
  const callOnBackend = async () => {
    ServiceCallers.health.ready({});
  };

  useEffect(() => {
    callOnBackend();
  }, []);

  return <div className={styles.entryPoint}>Hello world!</div>;
}
