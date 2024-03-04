class Flashcard {
  cards: string[];
  description: string;
  expected: string;
  correctIncrementsScoreBy: number;
  incorrectDecrementsScoreBy: number;

  constructor(
    cards: string[],
    description: string,
    expected: string,
    correctIncrementsScoreBy: number,
    incorrectDecrementsScoreBy: number,
  ) {
    this.cards = cards;
    this.description = description;
    this.expected = expected;
    this.correctIncrementsScoreBy = correctIncrementsScoreBy;
    this.incorrectDecrementsScoreBy = incorrectDecrementsScoreBy;
  }

  toDTO(): FlashcardDTO {
    return {
      cards: this.cards,
      description: this.description,
    };
  }
}

export type FlashcardDTO = {
  cards: string[];
  description: string;
};

export default Flashcard;
