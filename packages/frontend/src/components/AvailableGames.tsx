import { ServiceCallers } from "@/services/serviceCallers";
import { isServiceError } from "@tiles-tbd/api";
import { Box, Button, Text } from "grommet";
import Link from "next/link";

export default async function AvailableGames() {
  const maybeAvailableGames = await ServiceCallers.tileGame.getAvailableGames(
    {}
  );
  if (isServiceError(maybeAvailableGames)) {
    console.log(maybeAvailableGames);
    return <div>Error loading games!</div>;
  }

  return (
    <Box gap="2" margin="10px">
      <Text>Available games</Text>
      {maybeAvailableGames.tileGames.map((tileGame) => (
        <Link href={`tile-game/${tileGame.tileGameId}`}>
          <Button label={tileGame.tileGameId} key={tileGame.tileGameId} />
        </Link>
      ))}
      <Box>
        <Text>Create new game</Text>
      </Box>
    </Box>
  );
}
