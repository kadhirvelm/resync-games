import { DisplayText, Flex, Spinner } from "../../../lib/radix";
import { ClientServiceCallers } from "../../../services/serviceCallers";
import { useEffect, useState } from "react";
import { isServiceError, SnapshotStateDisplay } from "@/imports/api";
import styles from "./OpenSnapshotState.module.scss";
import { useRouter } from "next/navigation";

export const OpenSnapshotState = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [availableSnapshots, setAvailableSnapshots] = useState<
    SnapshotStateDisplay[]
  >([]);

  const getAvailableSnapshots = async () => {
    setIsLoading(true);
    const snapshots =
      await ClientServiceCallers.snapshotState.getSnapshotStates({});

    if (isServiceError(snapshots)) {
      console.error(snapshots);
      return;
    }

    setAvailableSnapshots(snapshots.snapshotStates);
    setIsLoading(false);
  };

  useEffect(() => {
    getAvailableSnapshots();
  }, []);

  if (isLoading) {
    return (
      <Flex align="center" flex="1" justify="center">
        <Spinner />
      </Flex>
    );
  }

  const onInitiateGameFromSnapshot = async (snapshot: SnapshotStateDisplay) => {
    setIsLoading(true);
    const response =
      await ClientServiceCallers.snapshotState.initiateGameFromSnapshot({
        ...snapshot
      });
    setIsLoading(false);

    if (isServiceError(response)) {
      console.error(response);
      return;
    }

    router.push(`/${snapshot.gameType}/${response.gameId}`);
  };

  return (
    <Flex direction="column" flex="1" gap="2">
      <Flex align="center">
        <DisplayText color="gray" size="2">
          {availableSnapshots.length} snapshot
          {availableSnapshots.length === 1 ? "" : "s"} available
        </DisplayText>
      </Flex>
      {availableSnapshots.map((snapshot) => (
        <Flex
          className={styles.snapshot}
          direction="column"
          gap="3"
          key={snapshot.timestamp}
          onClick={() => onInitiateGameFromSnapshot(snapshot)}
          p="2"
        >
          <Flex align="center" justify="between">
            <DisplayText>{snapshot.gameType}</DisplayText>
            <DisplayText>
              {new Date(snapshot.timestamp).toLocaleString()}
            </DisplayText>
          </Flex>
          <DisplayText color="gray" size="2">
            {snapshot.description}
          </DisplayText>
        </Flex>
      ))}
    </Flex>
  );
};
