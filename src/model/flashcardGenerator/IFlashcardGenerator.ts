import Flashcard from "../flashcard/Flashcard";

interface IFlashcardGenerator {
  next: () => Flashcard | null;
  reset: () => void;
}

export default IFlashcardGenerator;
