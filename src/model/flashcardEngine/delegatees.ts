import IFlashcardGenerator from "../flashcardGenerator/IFlashcardGenerator";
import MultiplicationFlashcardGenerator from "../flashcardGenerator/MultiplicationFlashcardGenerator";

export enum EngineType {
  MULTIPLICATION = "Multiplication",
}

export const engineTypeToDelegateeMapping: {
  [key in EngineType]: () => IFlashcardGenerator;
} = {
  [EngineType.MULTIPLICATION]: () => new MultiplicationFlashcardGenerator(0, 12),
};
