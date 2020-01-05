import Hashing from './Hashing';
import { performance } from 'perf_hooks';

class ProoOfWork {
  private data: string;
  private nonce: number = 0;
  private difficulty: number;

  constructor(data: string, difficulty: number) {
    this.data = data;
    this.difficulty = difficulty;
  }

  calculateProofOfWork = async (): Promise<string> => {
    let difficultyStr: string = this.getDifficultyZeroString();

    let startExecutionTime: number = performance.now();
    let finishExecutionTime: number;
    let executionTime: number;
    while (true) {
      let hashedData: string = await Hashing.ComputeHashSHA256(`${this.nonce} ${this.data}`);

      if (hashedData.startsWith(difficultyStr, 0)) {
        finishExecutionTime = performance.now();
        executionTime = finishExecutionTime - startExecutionTime; // ms
        console.log(`Difficulty level: ${this.difficulty} - Nonce: ${this.nonce} - Elapsed Time: ${executionTime} milliseconds.`);
        console.log(hashedData);
        console.log('\n');
        return hashedData;
      }

      this.nonce = this.nonce + 1;
    }
  };

  private getDifficultyZeroString(): string {
    let str: string = '';
    let counter: number = this.difficulty;
    while (counter > 0) {
      str = str + '0';
      counter--;
    }
    return str;
  }
}

export default ProoOfWork;
