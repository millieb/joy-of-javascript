/* 3.5 - Modeling Transaction with Behavior Delegation (OLOO) */

// The entire chain is based on simple objects, with Transaction at the base of the hierarchy
const Transaction = {
    // The init functions are analogous to a class's constructor.
    // The use of the function keyword is deliberate to establish the proper behavior of this.
    init(sender, recipient, funds = 0.0){
        const _feePercent = 0.6;
        // Private properties are nicely encapsulated in the objects closure
        // Allowing only privileged methods to access them

        this.sender = sender;
        this.recipient = recipient;
        this.funds = Number(funds);

        this.netTotal = function(){
            return _precisionRound(this.funds * _feePercent, 2);
        }

        function _precisionRound(number, precision){
            const factor = Math.pow(10, precision);
            return Math.round(number * factor) / factor;
        }
        // Because I'm using a plain function as constructor, there is no implied this.
        // We need to add it ourselves
        return this;
    },
    displayTransaction() {
        return "Transaction from ${this.sender} to ${this.recipient} for ${this.funds}";
    }
}

// Object.create property creates the implicit declaration linkage using [[Prototype]]
const HashTransaction = Object.create(Transaction);

// The init functions are analogous to a class's constructor
// The use of the function keyword is deliberate to establish the proper behavior of this
HashTransaction.init = function HashTransaction(
    sender, recipient, funds
) {
    // Equivalent to the use of super within a child class's constructor
    Transaction.init.call(this, sender, recipient, funds);
    this.transactionId = this.calculateHash();
    return this;
}

HashTransaction.calculateHash = function calculateHash(){
    // same as before
    const data = [this.sender, this.recipient, this.funds].join('');
    let hash = 0, i = 0;
    while (i < data.length){
        hash = ((hash << 5) - hash + data.charCodeAt(i++)) << 0;
    }
    return hash**2;
}

/* This code is the same as in 3.4 - HashTransaction but it adds more initialization logic
* to HashTransaction to clearly separate initialization from instantiation */


// 1. With OLOO, there are no constructor functions or classes, only plain objects.
//      Init is used to perform any instantiation logic

// 2. Objects use the prototype resolution mechanism to link to other objects in a peer-to-peer manner.

// 3. Object.create abstracts setting all prototype references.

/* LEFT OFF IN 3.3 - UNDERSTANDING OBJECT.ASSIGN */

// You can use Object.Assign() to merge the properties of various objects.

// use case: developing a mashup of several API responses and would like to deliver a response body
// as a single JSON.















