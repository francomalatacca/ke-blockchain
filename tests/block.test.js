const Block = require('../lib/block');

describe('Block', () => {
    let data, lastBlock, block;

    beforeEach(() => {
        data = ['bar'];
        firstBlock = Block.genesis();
        block = Block.mineBlock(firstBlock, data);
    })

    it('sets the `data` to match the input', () => {
        expect(Array.isArray(block.data)).toEqual(true);
    });
    
    it('sets the `prev hash` to match the hash of the last block', () => {
        expect(block.prevHash).toEqual(firstBlock.hash);
    });
})