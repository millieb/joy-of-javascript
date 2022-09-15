/* Section 4.4 - Currying and Closures */

/*
    Currying is a technique that helps compose functions when they require 
    multiple arguments. It relies heavily on closures.

    Closure is another form of scope or context created around functions that allows
    a function to reference sorrounding variables.
*/

// 4.8: Basics of scope with closures
const global = "global";
function outer() {
  const outer = "outer";
  function inner() {
    const inner = "inner";
    console.log(inner, outer, global); // prints 'inner outer global'
  }
  console.log(outer, global); // prints 'outer global'0
  inner();
}

/*
Going from bottom to top

3. Inner: has access to all globals, outer, and variables created inside inner function
2. Outer: has access to all globals, as well as variables created in outer function scope
1. Global: has access to all global variables

*/

/* 4.4.1 - Curried Function Application */

// A function that has its argument list expanded as stepwise, single, nested
// functions of single arguments is said to be curried.

// 4.9: Evaluating add as separate single-argument functions
const add = (x) => (y) => x + y;
const addThreeTo = add(3); // Addition does not take place until the last variable is bound
addThreeTo(7); // 10 -> Bind the expression, and the function executes.

/*
    Instead of receiving x and y arguments in one shot, the code accepts as singular functions 
    that get called sequentially. 
    Currying is the process of converting a function of multiple arguments (or arity N)
    to be evaluated it as N unary (arity) function.
    Until the entire list of arguments has been provided and all functions evaluated, a curried 
    function always returns the next function. 
    Currying is another form of composition: you're taking a complex function and evaluating
    as multiple simple ones. 
*/

// Going back to word-counting example
// ^ Instead of refactoring decode to accept another argument, let's embed another
// function in between to capture the encoding parameter (with its own default argument)

const decode =
  (encoding = "utf-8") =>
  (buffer) =>
    buffer.toString(encoding);

// Now we can call decode once to partially curry/set the encoding parameter and plug
// the resulting (remaining) function into the compose expression
const countWordsInFile = compose(count, split, decode("utf8"), read);

// With currying you can create a function that extracts multiple properties into an array
// by mapping prop over an array of keys

/*
    curry automates the manual currying process that we've been doing so far,
    converting a function of multiple arguments to several nested functions of a single 
    argument. Thus a function like add can be written as:
*/
const addCurryExample = curry((a, b) => a + b);
