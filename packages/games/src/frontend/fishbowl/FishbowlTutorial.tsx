import { DisplayText, Flex, Tabs } from "../../../lib/radix";
import { FishbowlGameConfiguration } from "../../backend";
import { ActiveWord } from "./playerComponents/components/activePlayer/ActiveWord";
import { SomeoneGotIt } from "./playerComponents/components/activePlayer/SomeoneGotIt";

export const FishbowlTutorial = ({
  gameConfiguration
}: {
  gameConfiguration: object;
}) => {
  const typedGameConfiguration = gameConfiguration as FishbowlGameConfiguration;

  return (
    <Tabs.Root defaultValue="overview">
      <Tabs.List>
        <Tabs.Trigger value="overview">Overview and setup</Tabs.Trigger>
        <Tabs.Trigger value="rules">Rules</Tabs.Trigger>
        <Tabs.Trigger value="interface">Interface</Tabs.Trigger>
        <Tabs.Trigger value="variations">Variations</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="overview">
        <Flex direction="column" gap="5" py="2">
          <Flex direction="column" gap="1">
            <DisplayText color="gray" size="2">
              Overview
            </DisplayText>
            <DisplayText>
              A fun guessing game where players give clues to a word. The other
              players have to guess the word based on the clues. The catch is
              how players are allowed to give clues changes round to round.
            </DisplayText>
          </Flex>
          <Flex direction="column" gap="2">
            <DisplayText color="gray" size="2">
              Game setup
            </DisplayText>
            <DisplayText>
              Open the global view on a screen everyone can see. We recommend
              using a laptop and casting to a TV using AirPlay. Note you'll need
              sound enabled on the global screen for the best experience.
            </DisplayText>
            <DisplayText>
              When you start the game, each player will contribute{" "}
              {typedGameConfiguration.wordsPerPlayer} words to the game. Once
              everyone has contributed their words, you're ready to start!
            </DisplayText>
          </Flex>
        </Flex>
      </Tabs.Content>
      <Tabs.Content value="rules">
        <Flex direction="column" gap="1" py="2">
          <DisplayText>
            The game is played over {typedGameConfiguration.totalRounds} rounds.
            Each round, the player who is currently giving clues will be the
            active player. The active player will give clues to the other
            players on their team to help them guess the word. Each time a word
            is guessed correctly, the active player gets a point for their team.
            The team with the most points at the end of the game wins.
          </DisplayText>
          <Flex py="2">
            <DisplayText weight="bold">
              The active team will guess the words outloud. The non-active team
              can submit their guesses in writing and score extra points if they
              get it right.
            </DisplayText>
          </Flex>
          <DisplayText>
            Each round how the active player is allowed to give clues changes.
            We recommend the following order for your first game:
          </DisplayText>
          <Flex direction="column" gap="1" ml="2">
            <Flex direction="column">
              <DisplayText>Round 1 - Taboo</DisplayText>
              <DisplayText color="gray" size="2">
                You can say anything you want, but you can't say the word itself
              </DisplayText>
            </Flex>
            <Flex direction="column">
              <DisplayText>Round 2 - Charades</DisplayText>
              <DisplayText color="gray" size="2">
                Act it out without making any sounds
              </DisplayText>
            </Flex>
            <Flex direction="column">
              <DisplayText>Round 3 - Single word</DisplayText>
              <DisplayText color="gray" size="2">
                Only allowed to say a single word
              </DisplayText>
            </Flex>
          </Flex>
          <DisplayText>
            Remember, you'll be repeating the same words throughout each round
            so make sure you remember them.
          </DisplayText>
        </Flex>
      </Tabs.Content>
      <Tabs.Content value="interface">
        <Flex direction="column" gap="5" py="2">
          <Flex direction="column" gap="1">
            <DisplayText color="gray" size="2">
              Player screen
            </DisplayText>
            <DisplayText>
              When you are the active player, you will see a screen that looks
              like this:
            </DisplayText>
            <Flex align="center" direction="column" py="2">
              <Flex direction="column" gap="1">
                <ActiveWord sampleWord="fishbowl" />
                <SomeoneGotIt />
              </Flex>
            </Flex>
            <DisplayText>
              You can press and hold the word to see it again. It hides by
              default to prevent cheating!
            </DisplayText>
            <DisplayText>
              If someone on your team gets the word right, you can either swipe
              the "someone got it" field, or you can press the red, yellow, and
              green squares, in that order to score.
            </DisplayText>
            <DisplayText>
              Click the "Drawing" button to enable drawing mode. You can select
              the color and stroke width below the canvas. Your drawing will
              show up on the global screen.
            </DisplayText>
            <Flex direction="column" gap="1" pt="2">
              <DisplayText color="gray" size="2">
                Scoring extra points
              </DisplayText>
              <DisplayText>
                When you are not the active player, you will see a screen that
                allows you submit guesses. When it's your team that's up, we
                recommend shouting your answers outloud. When it's the other
                team, you can submit your guesses in writing. Your team will
                score up to 1 extra point if anyone on your team gets the answer
                right before the active team. We also encourage distracting the
                other team with fun guesses.
              </DisplayText>
            </Flex>
          </Flex>
          <Flex direction="column" gap="1" py="2">
            <DisplayText color="gray" size="2">
              Global screen
            </DisplayText>
            <DisplayText>
              The global screen will show the current round, the active player,
              the previously guessed word, and any guesses that have been made
              by either team.
            </DisplayText>
          </Flex>
        </Flex>
      </Tabs.Content>
      <Tabs.Content value="variations">
        <Flex direction="column" gap="1" py="2">
          <DisplayText>
            Here are some clue giving variations to spice the game up that we've
            heard of:
          </DisplayText>
          <Flex direction="column" gap="1">
            <Flex direction="column">
              <DisplayText>Drawing</DisplayText>
              <DisplayText color="gray" size="2">
                Use the drawing mode to draw a picture of the word.
              </DisplayText>
            </Flex>
            <Flex direction="column">
              <DisplayText>Sound</DisplayText>
              <DisplayText color="gray" size="2">
                Make a single sound to describe the word.
              </DisplayText>
            </Flex>
            <Flex direction="column">
              <DisplayText>Blanket charades</DisplayText>
              <DisplayText color="gray" size="2">
                Act out the word without making any sounds, under a blanket.
              </DisplayText>
            </Flex>
            <Flex direction="column">
              <DisplayText>Rhymes with</DisplayText>
              <DisplayText color="gray" size="2">
                Only use words that rhyme with the word.
              </DisplayText>
            </Flex>
            <Flex direction="column">
              <DisplayText>Opposites</DisplayText>
              <DisplayText color="gray" size="2">
                Only use words that are the opposite of the word.
              </DisplayText>
            </Flex>
            <Flex direction="column">
              <DisplayText>Sock puppet</DisplayText>
              <DisplayText color="gray" size="2">
                Act out the word using a sock puppet.
              </DisplayText>
            </Flex>
            <Flex direction="column">
              <DisplayText>Accents or impressions</DisplayText>
              <DisplayText color="gray" size="2">
                Give the clue in a funny accent or impression
              </DisplayText>
            </Flex>
            <Flex direction="column">
              <DisplayText>Poems</DisplayText>
              <DisplayText color="gray" size="2">
                Give the clue in a poem.
              </DisplayText>
            </Flex>
            <Flex direction="column">
              <DisplayText>Whisper</DisplayText>
              <DisplayText color="gray" size="2">
                Give the clue in a whisper.
              </DisplayText>
            </Flex>
            <Flex direction="column">
              <DisplayText>Reverse psychology</DisplayText>
              <DisplayText color="gray" size="2">
                Give clues by saying things that are not true about the word.
              </DisplayText>
            </Flex>
            <Flex direction="column">
              <DisplayText>Sculpt it</DisplayText>
              <DisplayText color="gray" size="2">
                Sculpt the word out of clay or playdough.
              </DisplayText>
            </Flex>
            <Flex direction="column">
              <DisplayText>Freeze frame</DisplayText>
              <DisplayText color="gray" size="2">
                Give one frozen pose as the clue.
              </DisplayText>
            </Flex>
          </Flex>
        </Flex>
      </Tabs.Content>
    </Tabs.Root>
  );
};
