/* 4.1 - Functional Programming */

// Functional programming is many times related to the array APIs map, reduce, and filter.

/* Example #1: 
    Determine wether all block objects in an array are valid. 
    You can assume you can skip validating the genesis block
    and that all blocks have an isValid method.

    4.1: Combining map, filter, and reduce
*/
const array = [b1, b2, b3];

array
  // Skips the genesis block (which always is assumed to be valid)
  .filter((b) => !b.isValid())
  // Converts the array of blocks to an array of Boolean values by calling isValid on each block
  .map((b) => b.isValid())
  // Performs a logical AND of all the Boolean values together, parting from true, to obtain final result.
  .reduce((a, b) => a && b, true);

/* Note: Methods such as reverse and sort mutate the array.
  An immutable function that always returns a predictable result, given a set of arguments,
  is known as pure, and that is the definition of Functional Programming*/

/*
    Definition: Functional Programmint
        Functinoal Programming is the art of composing higher-order functinos to advance
        the state of a program in a pure manner.
  */

// The Functional Way: R u l e s

/*
1.- Functions must always return a value and declare at least one parameter.

2.- The observable state of an application before and after a function does not change;
    it's immutable and side-effect-free. A new state is created each time.

3.- Everything a function needs to carry its work must be passed in via arguments or
    inherited from its sorrounding outer function(closure), provided that the outer function
    abides by the same rules.

4.- A functino called with the same input must always produce the same output. This rule leads
    to a principle known as referential transparency, which states that an expression and its 
    corresponding value are interchangeable without altering the code's behavior.
*/
