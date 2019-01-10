const items = [...Array(10).keys()]
const reducer = (prevSum, curr) => prevSum + curr
const multiplier = (prevSum, curr) => prevSum * curr
console.log(items)
console.log(items.reduce(reducer))
console.log(items.map(i => i + 1).reduce(multiplier))

const items = [...Array(10).keys()]
let sum = 0
for (var i = 0; i < items.length; i++) {
    console.log(items[i])
    sum = sum + items[i]
}
console.log(sum);

const y = function (le) {
    return function (f) {
        return f(f);
    }(function (f) {
        return le(
            function (x) { return (f(f))(x); }
        );
    });
};


const makeFact = function (givenFact) {
    return function (n) {
        if (n < 2) return 1;
        else return n * givenFact(n - 1);
    }
};
const fact = y(makeFact);
console.log('Factorial ' + fact(5)); // Outputs 120


const someCurve = (n) => n ^ 2 - (3 * n) + 4

const factorialV1 = (n) => { if (n <= 2) { return n } else { return factorial(n - 1) * n; } }

const factorial = function (n, func) {
    if (n <= 2) {
        console.log("Return n " + n);
        return n;
    }
    console.log(n + " is bigger than 2");
    let v = func(n - 1, func)
    return v * n;
}

//console.log(factorial(5, factorial));

console.log(someCurve(6));
console.log(someCurve(7));
console.log(someCurve(2));
console.log(someCurve(9));
