import {
  isServiceError,
  SnapshotId,
  SnapshotStateDisplay
} from "@/imports/api";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DisplayText, Flex, IconButton, Spinner } from "../../../lib/radix";
import { ClientServiceCallers } from "../../../services/serviceCallers";
import styles from "./OpenSnapshotState.module.scss";

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

  const onDeleteSnapshot = async (snapshotId: SnapshotId) => {
    const response =
      await ClientServiceCallers.snapshotState.deleteSnapshotState({
        snapshotId
      });

    if (isServiceError(response)) {
      console.error(response);
      return;
    }

    setAvailableSnapshots(
      availableSnapshots.filter(
        (snapshot) => snapshot.snapshotId !== snapshotId
      )
    );
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
        <Flex align="center" gap="2" key={snapshot.timestamp}>
          <Flex
            className={styles.snapshot}
            direction="column"
            flex="1"
            gap="3"
            onClick={() => onInitiateGameFromSnapshot(snapshot)}
            p="4"
          >
            <DisplayText>{snapshot.gameType}</DisplayText>
            <DisplayText color="gray" size="2">
              {new Date(snapshot.timestamp).toLocaleString()}
            </DisplayText>
            <DisplayText color="gray" size="2">
              {snapshot.description}
            </DisplayText>
          </Flex>
          <IconButton
            color="red"
            onClick={() => onDeleteSnapshot(snapshot.snapshotId)}
            variant="outline"
          >
            <TrashIcon size={16} />
          </IconButton>
        </Flex>
      ))}
    </Flex>
  );
};
