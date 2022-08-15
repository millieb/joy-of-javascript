/* 3.4 - Assembling Objects Using Mixing Composition */

// The general process is to copy fine grained pieces of multiple independent
// slices of objects that together represent the entirety of the object's API

/* Object.assign() */

// Trivial Object Literals

const HasBread = {
    bread: 'Wheat',
    toasted: true
};

const HasToppings  = {
    sauce: 'Ranch'
}

const HasTomatoes = {
    tomatoe: 'Cherry',
    cut: 'diced'
};

const HasMeat = {
    meat: 'Chicken',
    term: 'Grilled'
};

// Our sandwich object can be created by joining any or all of these parts

const Sandwich = (size = '6', unit = 'in' ) =>
    Object.assign({
        size, unit
    },
    HasBread,
    HasToppings,
    HasTomatoes,
    HasMeat
    );

const footLong = Sandwich(1, 'ft');
footLong.tomatoe;   // 'Cherry'

// Most succintly, you can take advantage of the spread operator

const Sandwich = (size = 6, unit = 'in') => ({
    size, unit,
    ...HasBread,
    ...HasToppings,
    ...HasTomatoes,
    ...HasMeat
});