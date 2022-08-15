/* 3.17 - Blockchain definition with mixins */
class Blockchain {
    // Basic class declaration of block
    #blocks = new Map();

    constructor(genesis = createGenesisBlock()){
        this.#blocks.set(genesis.hash, genesis);
    }

    height() {
        return this.#blocks.size;
    }

    lookup(hash){
        const h = hash;
        if(this.#block.has(h)){
            return this.#blocks.get(h);
        }
        throw new Error('Block with hash ${h} not found!');
    }

    push(newBlock){
        this.#blocks.set(newBlock.hash, newBlock);
        return newBlock;
    }
}

function createGenesisBlock(previousHash = '0'.repeat(64)){
    // ...
}

// As with transaction, extends blockchain with validation functionality.
Object.assign(Blockchain.prototype, HasValidation());


// The most important job of this class is to manage a collection of transactions
// and the hashing calculation by using its previous hash.

// What makes tampering detectable in a blockchain is that every block's hash depends on the hashes
// of all the previous blocks, starting with the genesis.
// If a block is tampered, all you need to do is recompute its hash and compare it with the original
// to detect the malfeasance.


/* 3.18 - Block Definition */
class Block {
    #blockchain;

    constructor(index, previousHash, data = []){
        this.index = index;
        // A block's data field can contain a collection of pending transactions found in the
        // blockchain at the moment a new block is mined or mined transactions found after the block is
        // mined into the chain
        this.data = data;
        // Every block always contains the hash of the block that preceded it (which establishes the chain)
        this.previousHash = previousHash;
        this.timestamp = Date.now();
        // HasHash augments Block with hashing functionality
        this.hash = this.calculateHash();
    }

    set blockchain(b){
        this.#blockchain = b;
        return this;
    }

    isGenesis(){
        return this.previousHash === '0'.repeat(64);
    }
}

Object.assign(
    Block.prototype,
    HasHash(['index', 'timestamp', 'previousHash', 'data']),
    HasValidation()
);


/* 3.19 - Wallet Object */
class Wallet {
    constructor(publicKey, privateKey){
        this.publicKey = publicKey
        this.privateKey = privateKey
    }
    get address(){
        return this.publicKey
    }
    balance(ledger){
        // details in chapter 4
    }
}

/* 3.20 - Assigning Mixins to a Single Instance of Transaction */

Object.assign(
    new Transaction(),
    HasHash(['timestamp', 'sender', 'recipient', 'funds']),
    HasSignature(['sender', 'recipient', 'funds']),
    hasValidation()
)


/* 3.21 - HasHash mixin */
const HasHash = keys => ({
    calculateHash(){
        const data = keys.map(f => this[f]).join('');
        let hash = 0; i = 0;
        while(i < data.length){
            hash = ((hash << 5) - hash + data.charCodeAt(i++)) << 0;
        }
        return hash**2;
    }
});

// Left off in Chapter 4
