import IFlashcardEngine from "./IFlashcardEngine";
import Flashcard, { FlashcardDTO } from "../flashcard/Flashcard";
import IFlashcardGenerator from "../flashcardGenerator/IFlashcardGenerator";

class FlashcardEngine implements IFlashcardEngine {
  currentFlashcard: Flashcard | null = null;
  currentFlashcardAnswered = true;
  score = 0;
  flashcardGenerator: IFlashcardGenerator;

  constructor(flashcardGenerator: IFlashcardGenerator) {
    this.flashcardGenerator = flashcardGenerator;
    this.nextQuestion();
  }

  answer(ans: string | undefined): boolean {
    if (!this.currentFlashcard) {
      throw new Error(
        "There is no flashcard in play! Call the nextQuestion method first!",
      );
    }

    this.currentFlashcardAnswered = true;

    if (ans === this.currentFlashcard.expected) {
      this.score += this.currentFlashcard.correctIncrementsScoreBy;
      return true;
    }

    this.score -= this.currentFlashcard.incorrectDecrementsScoreBy;
    return false;
  }

  getScore(): number {
    return this.score;
  }

  nextQuestion(): FlashcardDTO | null {
    if (!this.currentFlashcardAnswered) {
      return this.currentFlashcard;
    }

    const flashcard = this.flashcardGenerator.next();
    if (!flashcard) {
      return null;
    }

    this.currentFlashcard = flashcard;
    this.currentFlashcardAnswered = false;

    return flashcard.toDTO();
  }

  reset(): void {
    this.currentFlashcard = null;
    this.currentFlashcardAnswered = true;
    this.score = 0;
    this.flashcardGenerator.reset();
  }
}

export default FlashcardEngine;
