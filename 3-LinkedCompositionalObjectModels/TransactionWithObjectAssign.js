const Transaction = {
    init(sender, recipient, funds = 0.0) {
        this.sender = sender;
        this.recipient = recipient;
        this.funds = Number(funds);
        return this;
    },
    displayTransaction() {
        return 'Transaction from ${this.sender} ti ${this.recipient} for ${this.funds}';
    }
}

// Defines the properties of HashTransaction through assignment using Object.assign
const HashTransaction = Object.assign(
    Object.create(Transaction),
    {
        calculateHash() {
            const data = [this.sender, this.recipient, this.funds].join('');
            let hash = 0, i= o;
            while (i < data.length){
                hash = ((hash << 5 ) - hash + data.charCodeAt(i++)) << 0;
            }
            return hash**2;
        }
    }
);

/* A mixin is an object with simple behavior
* Typically made from one or two methods.
* Mixins should have a narrow focus, much smaller than a class.
* They could capture a single responsibility or perhaps even a slice of a responsibility. */