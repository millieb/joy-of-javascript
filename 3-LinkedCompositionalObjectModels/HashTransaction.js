/* 3.4 - Hash Transaction with Simple Object Linking */

const Transaction = {
    /* This init method is the exact equivalent of a class constructor */
    init(sender, recipient, funds = 0) {
        this.sender = sender;
        this.recipient = recipient;
        this.funds = Number(funds);
        /* Because the object is returned directly, results in the properties of this object
        * contained inside the specialized object */
        return this;
    },
    displayTransaction(){
        return 'Transaction from ${this.sender} to ${this.recipient} for ${this.funds}';
    }
}

const HashTransaction = Object.create(Transaction);

HashTransaction.calculateHash = function calculateHash(){
    const data = [this.sender, this.recipient, this.funds].join('');
    let hash = 0, i = 0;
    while (i < data.length){
        hash = ((hash << 5) - hash + data.charCodeAt(i++)) << 0;
    }
    return hash**2;
}

/* Uses Object.create to build new objects and nicely separate prototype linkage from object initialization */
const tx = Object.create(HashTransaction).init('mildred@email.com', 'alex@email.com', 10);

tx.sender;      // mildred@email.com
tx.recipient;   // alex@email.com
tx.calculateHash();  // 'calculated has number like: 6486465165165416'

/* This method is invoked through the prototype chain */
tx.displayTransaction();


// This shows how you can establish implicit links among objects and at the same time remove the
// prototypical boilerplate code that you would have needed to write classes and constructor functions. 