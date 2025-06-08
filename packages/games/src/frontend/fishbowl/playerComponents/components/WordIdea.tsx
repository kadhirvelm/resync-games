import { LightbulbIcon, RefreshCcwIcon } from "lucide-react";
import { Button, DisplayText, Flex } from "../../../../../lib/radix";
import { useState } from "react";
import { WORD_IDEAS } from "../../assets/wordIdeas";
import { sample } from "lodash-es";

export default function WordIdea() {
  const [displayingIdea, setDisplayingIdea] = useState<string | undefined>();

  const getRandomWordIdea = () => {
    setDisplayingIdea(sample(WORD_IDEAS));
  };

  const renderNewIdeaText = () => {
    if (displayingIdea === undefined) {
      return (
        <>
          <LightbulbIcon size={16} />
          Give me an idea
        </>
      );
    }

    return <RefreshCcwIcon size={16} />;
  };

  return (
    <Flex align="center" gap="2">
      <Button onClick={getRandomWordIdea} variant="outline">
        {renderNewIdeaText()}
      </Button>
      {displayingIdea !== undefined && (
        <DisplayText color="gray">{displayingIdea}</DisplayText>
      )}
    </Flex>
  );
}
