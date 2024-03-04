import AdditionFlashcardGenerator from "../flashcardGenerator/AdditionFlashcardGenerator";
import IFlashcardGenerator from "../flashcardGenerator/IFlashcardGenerator";
import MultiplicationFlashcardGenerator from "../flashcardGenerator/MultiplicationFlashcardGenerator";

export enum EngineType {
  MULTIPLICATION = "Multiplication",
  ADDITION = "Addition",
}

export const engineTypeToDelegateeMapping: {
  [key in EngineType]: () => IFlashcardGenerator;
} = {
  [EngineType.MULTIPLICATION]: () =>
    new MultiplicationFlashcardGenerator(0, 12),
  [EngineType.ADDITION]: () => new AdditionFlashcardGenerator(0, 12),
};
