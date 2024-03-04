import Flashcard from "../flashcard/Flashcard";
import Pairs from "../pairs/Pairs";
import IFlashcardGenerator from "./IFlashcardGenerator";

class MultiplicationFlashcardGenerator implements IFlashcardGenerator {
  pairs: Pairs;

  constructor(min: number, max: number) {
    this.pairs = new Pairs(min, max);
  }

  next(): Flashcard | null {
    const nextPair = this.pairs.getUnseenPairCombination();
    if (!nextPair) {
      return null;
    }

    const newFlashcard = new Flashcard(
      [nextPair[0].toString(), nextPair[1].toString()],
      "Multiplication",
      (nextPair[0] * nextPair[1]).toString(),
      1,
      1,
    );

    return newFlashcard;
  }

  reset(): void {
    this.pairs.reset();
  }
}

export default MultiplicationFlashcardGenerator;
