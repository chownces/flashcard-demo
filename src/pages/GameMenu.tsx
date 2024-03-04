import { Button, Select, Space } from "antd";
import {
  EngineType,
  engineTypeToDelegateeMapping,
} from "../model/flashcardEngine/delegatees";
import IFlashcardGenerator from "../model/flashcardGenerator/IFlashcardGenerator";

type GameMenuProps = {
  defaultEngine: EngineType;
  setSelectedDelegatee: React.Dispatch<
    React.SetStateAction<() => IFlashcardGenerator>
  >;
  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
};

const GameMenu: React.FC<GameMenuProps> = ({
  defaultEngine,
  setSelectedDelegatee,
  setIsGameStarted,
}) => {
  const handleChange = (value: string) => {
    if (!Object.values<string>(EngineType).includes(value)) {
      throw new Error("Selected engine type does not exist!");
    }
    const delegatee = engineTypeToDelegateeMapping[value as EngineType];
    setSelectedDelegatee(delegatee);
  };

  const options = Object.values(EngineType).map((engineType) => ({
    value: engineType,
    label: engineType,
  }));

  return (
    <Space direction="vertical">
      <Select
        defaultValue={defaultEngine}
        onChange={handleChange}
        options={options}
      />
      <Button type="primary" onClick={() => setIsGameStarted(true)}>
        Start!
      </Button>
    </Space>
  );
};

export default GameMenu;
