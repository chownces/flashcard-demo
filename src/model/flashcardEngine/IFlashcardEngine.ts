import { FlashcardDTO } from "../flashcard/Flashcard";

interface IFlashcardEngine {
  /**
   * Returns true if correct, and false if incorrect.
   */
  answer: (ans: string | undefined) => boolean;

  /**
   * Returns the correct score.
   */
  getScore: () => number;

  /**
   * Get the next question in the flashcard engine.
   */
  nextQuestion: () => FlashcardDTO | null;

  /**
   * Reset the flashcard engine state.
   */
  reset: () => void;
}

export default IFlashcardEngine;
