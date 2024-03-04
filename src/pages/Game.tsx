import { useState } from "react";
import {
  EngineType,
  engineTypeToDelegateeMapping,
} from "../model/flashcardEngine/delegatees";
import GameMenu from "./GameMenu";
import GamePlay from "./GamePlay";

const Game: React.FC = () => {
  const [selectedDelegatee, setSelectedDelegatee] = useState(
    () => engineTypeToDelegateeMapping[defaultEngine],
  );
  const [isGameStarted, setIsGameStarted] = useState(false);

  return !isGameStarted ? (
    <GameMenu
      defaultEngine={defaultEngine}
      setSelectedDelegatee={setSelectedDelegatee}
      setIsGameStarted={setIsGameStarted}
    />
  ) : (
    <GamePlay
      selectedDelegatee={selectedDelegatee}
      endGame={() => setIsGameStarted(false)}
    />
  );
};

const defaultEngine = EngineType.MULTIPLICATION;

export default Game;
