/* 3.11 - Defining the HasHash Mixin */

const HasHash = keys => ({
    calculateHash() {
        // Creates a string from the values of the specified property keys.
        const data = keys.map(f => this[f]).join('');
        let hash = 0; i =0;
        while(i < data.length){
            hash = ((hash << 5 ) - hash + data.charCodeAt(i++)) << 0;
        }

        return hash**2;
    }
});

// HasHash is a mixin wrapped by a function expression, so the mixin part is
// the object literal in LOC 6 - 14


/* 3.12 - OLOO Pattern for Transaction using the HasHash Mixin */

const Transaction = {
    init(sender, recipient, funds = 0.0){
        this.sender = sender;
        this.recipient = recipient;
        this.funds = Number(funds);
        return this;
    },
    displayTransaction() {
        return 'Transaction from ${this.sender} to ${this.recipient} for ${this.funds}';
    }
}

// Copies the properties of the mixin return by calling HasHash. By using a function, it's simple to specify
// which properties of the object's state the mixin has access to as part of calculating the object's hash value.
const HashTransaction = Object.assign(
    Object.create(Transaction),
    HasHash(['sender', 'recipient', 'funds'])
);


/* 3.13 - Transaction Object using Mixin Concatenation */

class Transaction {
    // The transactionId is set by the constructor by calling calculateHash,
    // dynamically assigned to this instance's prototype and available to all instances
    transactionId = '';
    timestamp = Date.now();
    #feePercent = 0.6;

    constructor(sender, recipient, funds = 0.0, description = 'Generic'){
        this.sender = sender;
        this.recipient = recipient;
        this.funds = Number(funds);
        this.description = description;
        this.transactionId = this.calculateHash();
    }

    displayTransaction(){
        return 'Transaction ${this.description} from ${this.sender} to ${this.recipient} for ${this.funds}';
    }

    get netTotal(){
        return Transaction.#precisionRound(
            this.funds * this.#feePercent, 2);
    }

    static #precisionRound(number, precision){
        const factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
    }
}

// Using Object.assign to glue together (or include) the objects that make up a Transaction
Object.assign(
    Transaction.prototype,
    HasHash(['timestamp', 'sender', 'recipient', 'funds']),
    // The HasSignature mixin handles signature generation and verification
    HasSignature(['sender', 'recipient', 'funds']),
    // HasValidation groups common validation tasks for any object
    HasValidation()
)


/* We use Object.assign to extend the class's prototype dynamically and avoid having to
* repeat the logic of assigning mixins every time we need a new transaction */

// Mixins enable a developer to reuse sets of methods freely from several independent objects rather than one
// The algorithm that Object.assign uses removes the ambiguity caused by multiple inheriance and makes this process predictable


/* Left off in 3.5 - Applying Shared Mixins to Multiple Objects */
















