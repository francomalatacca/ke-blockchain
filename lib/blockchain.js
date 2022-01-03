
let Block = require('./block');

class BlockChain {

    constructor(nonce = 1) {
        this.blockchain = [];
        this.blockchain.push(Block.genesis());
        this.nonce = nonce;
    }

    obtainLatestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }

    addNewBlock(data) {
        const newBlock = Block.mineBlock(this.obtainLatestBlock(), data, this.nonce);
        this.blockchain.push(newBlock);
        return newBlock;
    }

    isValid(blockchain) {
        if (JSON.stringify(blockchain[0]) !== JSON.stringify(Block.genesis(this.nonce))) {
            return false;
        }

        for (let i = 1; i < blockchain.length; i++) {
            const block = blockchain[i];
            const prevBlock = blockchain[i - 1];

            if (block.prevHash !== prevBlock.hash ||
                block.hash !== Block.verify(block, this.nonce)) {
                return false;
            }
        }

        return true;
    }

    isConsistent(newBlockchain) {
        for (let i = 1; i < this.blockchain.length; i++) {
            const block = this.blockchain[i];
            const newBlock = newBlockchain[i];
            if(block.toString() !== newBlock.toString()) {
                return false;
            }
        }

        return true;
    }

    replaceBlockchain(newBlockchain) {
        if (newBlockchain.length <= this.blockchain.length) {
            console.log("new blockchain equal or shorter than the current blockchain");
            return false;
        } else if (!this.isValid(newBlockchain)) {
            console.log("new blockchain is invalid");
            return false;
        } else if (!this.isConsistent(newBlockchain)) {
            console.log("new blockchain is inconsistent");
            return false;            
        }

        this.blockchain = newBlockchain;
        return true;
    }
}

module.exports = BlockChain;