const Blockchain = require('../lib/blockchain');
const Block = require('../lib/block');

describe('Blockchain', () => {
    let bc;
    let bc2;

    beforeEach(() => {
        bc = new Blockchain();
        bc2 = new Blockchain();
        bc3 = new Blockchain();
        bc4 = new Blockchain();
        bc5 = new Blockchain();
        bc6 = new Blockchain();
        bc7 = new Blockchain();
    })

    it('should start with the `genesis` block', () => {
        expect(bc.blockchain[0].prevHash).toEqual(null);
    });

    it('adds a new `block`', () => {
        const data = [{'key': 'val'}];
        bc.addNewBlock(data);

        expect(bc.blockchain[bc.blockchain.length - 1].data[0].key).toEqual(data[0].key);
    })

    it('validates a `blockchain`', () => {
        const data = [{'key': 'val'}];
        bc2.addNewBlock(data);

        expect(bc2.isValid(bc2.blockchain)).toBe(true);
    })

    it('invalidate a `blockchain`', () => {
        const data = [{'key': 'val'}];
        bc3.addNewBlock(data);
        expect(bc3.isValid(bc3.blockchain)).toBe(true)
        bc3.blockchain[1].data = [{'key': 'val*'}];
        expect(bc3.isValid(bc3.blockchain)).toBe(false);
    })

    it('replace the `blockchain` with a valid one', () => {
        const data = [{'key': 'val'}];
        bc4.addNewBlock(data);
        bc5.replaceBlockchain(bc4.blockchain);
        expect(bc5.blockchain).toEqual(bc4.blockchain);
    })

    it('replace the `blockchain` with an inconsistent one', () => {
        const data1 = [{'key': 'val'}];
        bc6.addNewBlock(data1);
        bc6.addNewBlock(data1);
        const data2 = [{'key': 'val2'}];
        bc7.addNewBlock(data2);
        bc7.replaceBlockchain(bc6.blockchain);
        expect(bc6.blockchain).not.toEqual(bc7.blockchain);
    })

})