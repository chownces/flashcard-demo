class Pairs {
  minNumberAllowed: number;
  maxNumberAllowed: number;
  seen: Map<number, Set<number>> = new Map();

  constructor(min: number, max: number) {
    if (min > max) {
      throw new Error("Pairs constructor: min is greater than max!");
    }
    this.minNumberAllowed = min;
    this.maxNumberAllowed = max;
  }

  getUnseenPairCombination(): [number, number] | null {
    if (this.checkAllPairCombinationsExhausted()) {
      return null;
    }

    const [randomNumber1, randomNumber2] = this.generateUnseenPair();
    this.updateSeen(randomNumber1, randomNumber2);

    return [randomNumber1, randomNumber2];
  }

  reset(): void {
    this.seen = new Map();
  }

  /**
   * Checks that each seen set contains the expected number of unique numbers,
   * and each number is within the `minNumberAllowed` `maxNumberAllowed` range inclusive.
   */
  private checkAllPairCombinationsExhausted(): boolean {
    const uniqueNumbers = this.maxNumberAllowed - this.minNumberAllowed + 1;
    const validateSetInclusion = (acc: boolean, s: Set<number>) => {
      const values = Array.from(s);
      return (
        acc &&
        values.length === uniqueNumbers &&
        values.reduce(
          (acc, x) =>
            acc && x >= this.minNumberAllowed && x <= this.maxNumberAllowed,
          true,
        )
      );
    };

    const firstNumberExhausted = [...this.seen.keys()].length === uniqueNumbers;
    const secondNumberExhausted = [...this.seen.values()].reduce(
      validateSetInclusion,
      true,
    );

    return firstNumberExhausted && secondNumberExhausted;
  }

  private generateUnseenPair(): [number, number] {
    let randomNumber1: number;
    let randomNumber2: number;

    while (true) {
      randomNumber1 = this.randomIntFromInterval();
      randomNumber2 = this.randomIntFromInterval();

      if (!this.seen.get(randomNumber1)?.has(randomNumber2)) {
        break;
      }
    }

    return [randomNumber1, randomNumber2];
  }

  /**
   * Update `seen` with the given number pair.
   */
  private updateSeen(firstNumber: number, secondNumber: number) {
    if (!this.seen.get(firstNumber)) {
      this.seen.set(firstNumber, new Set());
    }
    this.seen.get(firstNumber)?.add(secondNumber);
  }

  /**
   * `minNumberAllowed` and `maxNumberAllowed` inclusive.
   */
  private randomIntFromInterval(): number {
    return Math.floor(
      Math.random() * (this.maxNumberAllowed - this.minNumberAllowed + 1) +
        this.minNumberAllowed,
    );
  }
}

export default Pairs;
