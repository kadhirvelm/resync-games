import { ServiceCallers } from "@/services/serviceCallers";
import { isServiceError } from "@tiles-tbd/api";
import Link from "next/link";
import { Text } from "@radix-ui/themes";
import { Flex } from "@/lib/radix/Flex";
import { Button } from "@/lib/radix/Button";

export default async function AvailableGames() {
  const maybeAvailableGames = await ServiceCallers.tileGame.getAvailableGames(
    {}
  );
  if (isServiceError(maybeAvailableGames)) {
    console.log(maybeAvailableGames);
    return <div>Error loading games!</div>;
  }

  return (
    <Flex direction="column" gap="2" m="2">
      <Text>Available games</Text>
      {maybeAvailableGames.tileGames.map((tileGame) => (
        <Link href={`tile-game/${tileGame.tileGameId}`}>
          <Button key={tileGame.tileGameId}>{tileGame.name}</Button>
        </Link>
      ))}
      <Flex>
        <Link href="/tile-game/create">
          <Button>Create new game</Button>
        </Link>
      </Flex>
    </Flex>
  );
}
