/* 3.6 - Using Object.assign() to Implement Options with Defaults */

function doSomething(config = {}) {
    config = Object.assign(
        {
            foo: 'foo',
            bar: 'bar',
            baz: 'baz'
        }, config);

    console.log('Using config ${config.foo}, ${config.bar}, ${config.bar}');
}

doSomething();                  // Print Using config foo, bar, bar
doSomething({foo: 'hello'});    // Prints Using config hello, bar, bar


/* 3.7 - Using Object.assign() to Merge Two Objects into a New Object */

// These properties are enumerable and owned by the object, so they get copied.

const a = {
    a: 'a'
};
const b = {
    b: 'b'
};

Object.assign({}, a, b);    // { a: 'a', b: 'b' }

/* -> Example with a non enumerable property */

const a = {
    a: 'a'
};
const b = {};
Object.defineProperty(b, 'b', {
    value: 'b',
    enumerable: false
});

Object.assign({}, a, b); // { a: 'a' }

/* 3.3.2 - Assignment vs Definition */

// Assignment:
// -> Defines a property only if an assignment is made for a property that doesn't exist.

// Definition
// -> For new properties, JavaScript uses the [[DefineOwnProperty]] internal process.
// -> For existing properties, it uses [[Set]], which won't alter the property's meta attributes.


/* 3.8 - Using Object.assign() to Assign Values to New and Existing Properties */

function doSomething(config = {}) {
    config = Object.assign(
        {
            foo: 'foo',
            // foo gets set to 'hello' and bar and baz are newly defined during Object.assign
            bar: 'bar',
            baz: 'baz'
        }, config);

    console.log('Using config ${config.foo}, ${config.bar}, ${config.bar}');
}

doSomething({foo: 'hello'});


/* 04-26-2022: Left off in '3.4 - Assembling Objects Using Mixin Composition */













