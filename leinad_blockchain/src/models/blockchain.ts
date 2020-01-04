import Block from './block';

// This is actually a wrapper that kinds of encapsulates object in "Block"
class Blockchain {
  private currentBlock?: Block;
  private headBlock?: Block;
  private blocks: Block[];

  constructor() {
    this.blocks = [];
  }

  public acceptBlock(block: Block) {
    // This is first block, so make it the genesis block
    if (this.headBlock === undefined) {
      this.headBlock = block;
      this.headBlock.setPreviousBlockHash(undefined);
    }
    this.currentBlock = block;
    this.blocks.push(block);
  }
  public async verifyChain() {
    if (this.headBlock === undefined) {
      throw new Error('Genesis block not set.');
    }

    let isValid: boolean = await this.headBlock.isValidChain(undefined, true);

    if (isValid) {
      console.log('Blockchain integrity intact.');
    } else {
      console.log('Blockchain integrity corrupted.');
    }
  }

  /**
   * Getters
   */
  public getCurrentBlock(): Block | undefined {
    return this.currentBlock;
  }
  public getHeadBlock(): Block | undefined {
    return this.headBlock;
  }
  public getBlocks(): Block[] {
    return this.blocks;
  }
}

export default Blockchain;
