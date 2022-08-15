/* 3.2 - OLOO */

// OLOO's view of differential inheritance is that it does not
// consider child objects to derive from a base object.
// Rather, it considers peers that link together
// and also delegate functinoality by passing messages to each other.
// AN OBJECT LINKS TO ANOTHER.

/* Under hood of Object.create */ /*
Object.create = funtion(proto, propertiesObject) {
    if (typeof proto !== 'object' && typeof proto !== 'function') {
        throw new TypeError('Object prototype may only be an Object: ' + 
        proto);
    }

    // Creates a new superfluous constructor function, F
    function F() {}

    // Sets the prototype of the constructor function
    F.prototype = proto;

    // Returns the new object invoking the new keyboard
    return new F();
};
*/

// Let's start wiring up the chain and connect all of our objects.
// Here we are playing with the concept of the blockchain data structure

// A blockchain is an object that stores consecutive elements called 'blocks'

const MyStore = {
    // init is in charge of typical object constructor logic
    // as well as setting the properties of the new instances
    init(element) {
        this.length = 0;
        this.push(element);
    },
    push(b){
        this[this.length] = b;
        return ++this.length;
    }
}

const Blockchain = Object.create(MyStore); // linking objects MyStore and Blockchain

// then we link chain which is an instance object with all the functionality
const chain = Object.create(Blockchain);
chain.init(createGenesisBlock);
chain.push(new Block(/*...*/));
chain.length; // 2









