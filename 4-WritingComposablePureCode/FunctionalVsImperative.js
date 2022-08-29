/* 4.2 - Functional versus Imperative at a Glance */

/* Functional programming follows a declarative flow. It is written to match how it 
will be read. It focuses on what your are trying to accomplish rather than how. 

Code splitting, looping, and state management are tucked inside their respective steps. 
*/

const sount = (arr) => arr.length;
const split = (str) => str.spli(/\s+/);

// These functions above ^ can be combined directly

const countWords = (str) => count(split(str));

/* Imperative function that counts the words in a text file */
function countWordsInFile(file) {
  const fileBuffer = fs.readFileSync(file);
  const wordString = fileBuffer.toString();
  const wordsInArray = wordString.split(/\s+/);
  return wordsInArray.length;
}

/* Helper functions to support countWordsInFile */

// Creating aliases to shorten the filesystem API call
const decode = (buffer) => buffer.toString();
const read = fs.readFileSync;

const countWordsInFile = compose2(
  countWords, // split -> count
  compose2(decode, read) // read -> decode
);

/* 4.3.2 - Decomposing Complex Code */

/* Code we will be decomposing

const HasHash = keys => ({
    calculateHash(){
        const data = keys.map(f => this[f]).join('');
        let hash = 0, i = 0;
        while(i < data.length){
            hash = ((hash << 5) - hash + data.charCodeAt(i++)) << 0;
        }
        return hash**2;
    }
});
*/

// calculateHash performs two main tasks, split into two methods.

// 1. Assembling the data from the set of keys:
function assemble(keys) {
  return function (obj) {
    return keys.map((f) => obj[f]).join("");
  };
}

// 2. Computing the digest or cipher from this data:
function computeCipher(data, i = 0, hash = 0) {
  if (i >= data.length) {
    return hash ** 2;
  }
  // Calls itself recursively with the updated hash at each iteration
  // as an input argument to avoid assigning and changing data in place
  return computeCipher(
    data,
    i + 1,
    ((hash << 5) - hash + data.charCodeAt(i++)) << 0
  );
}

// composing the two smaller functions to compute the cipher of a transaction object:

function calculateHash() {
  return compose2(computeCipher, assemble(keys, this))();
}

const HasHash = (keys) => ({
  calculateHash() {
    return compose2(computeCipher, assemble(keys))(this);
  },
});
