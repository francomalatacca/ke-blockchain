const SHA256 = require("crypto-js/sha256");

class Block {

  constructor(data, prevHash = null, timestamp = Date.now(), nonce = 1) {
    //todo: implement sanity check for data, nonce and prevHash
    this.nonce = nonce;
    this.timestamp = timestamp;
    try {
      this.data = Block.sanitize_data(data);
    } catch (error) {
      console.error('Invalid data format');
      this.data = [];
    } 
    this.prevHash = prevHash;
    this.hash = Block.calculateHash(this.prevHash, this.timestamp, this.data, nonce = 1);
  }

  toString() {
    return `block -
      hash      : ${this.hash.substring(0,10)}..
      date_time : ${new Date(this.timestamp).toISOString()} (${this.timestamp})
      data      : ${JSON.stringify(this.data)}
      prev      : ${this.prevHash.substring(0,10)}..`;
  }

  static calculateHash(prevHash, timestamp, data, nonce = 1) { // Compute this Block's hash
    return SHA256(`${prevHash}${timestamp}${JSON.stringify(data)}${nonce}`).toString();
  }

  static genesis(nonce = 1) {
    let unix_timestamp = 1549312452;
    return new this([], null, unix_timestamp, nonce);
  }

  static mineBlock(block, data, nonce = 1) {
    const timestamp = Date.now();
    const prevHash = block.hash;
    return new this(data, prevHash, timestamp, nonce);
  }

  static verify(block, nonce = 1) {
    const { prevHash, timestamp, data } = block;
    return Block.calculateHash(prevHash, timestamp, data, nonce);
  }

  static sanitize_data(data) {
    if (Array.isArray(data)) {
      return data;
    } else {
      throw new TypeError('data must be an array');
    }
  }


};

module.exports = Block;