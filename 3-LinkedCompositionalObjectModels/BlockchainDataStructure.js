/* 3.3 - Understanding Object.assign */

/*
We can use Object.assign to implement options with defaults.
*/

function doSomething(config = {}) {
  config = Object.assign(
    {
      foo: "foo",
      bar: "bar",
      baz: "baz",
    },
    config
  );
  console.log(`Using config ${config.foo}, ${config.bar}, ${config.bar}`);
}

doSomething(); // Prints Using config foo, bar, bar
doDomething({ foo: "hello" }); // Prints Using config hello, bar, bar

/*
Using Object.assign to merge two objects into a new object
*/

const a2 = {
  a2: "a2",
};
const b2 = {
  b2: "b2",
};

Object.assign({}, a2, b2); // {a: 'a', b: 'b'}

// In this scenario above, all the objects have their properties as enumerable: true.
// Which means that Object.assign will scan and copy them.

/* Exmaple: non-enumerable property */
const a = {
  a: "a",
};

const b = {};
Object.defineProperty(b, "b", {
  value: "b",
  enumerable: false,
});
Object.assign({}, a, b); // {a: 'a'}

/*
Now consider a property with the same name, with objects being merged. 
The rule is that the object to the right overrides the set of properties
of the object to the left in the list.
*/

/* Using Object.assing() to assign values to new and existing properties */
const Transaction = {
  sender: "luis@tjoj.com",
};
Object.assign(Transaction, { sender: "luke@tjoj.com" });
// The preceding call works as expected and the sender is set to luke@tjoj.com
