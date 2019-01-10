const items = [...Array(10).keys()].map(x => x + 1)
U = g => g(g)

function reduceV1(arr) {
    const [first, ...rest] = arr;
    if (!rest.length) return 0;
    return first + reduceV1(rest)
}

console.log(reduceV1(items));
const adderV1 = a =>b => a + b
const adder = (a,b) => a + b

console.log(adderV1(2)(3));
console.log(adder(2,3));

// const reduceV2 = { func => {
//     (arr, adder, sum) =>
//         !arr.length
//             ? sum
//             : func(func)(a.slice(1), adder, adder(sum, arr[0]))
// }}

reduce = U(
    g =>
      (a, cb, i) =>
        !a.length
          ? i
          : g(g)( a.slice(1), cb, cb(i, a[0]) )
  )

const total = reduce([1,2,3], (acc, curr) => acc + curr, 0)
console.log(total);



const functionFactory = function () {
    let counter = 10;
    return function () {
        if (!counter) {
            console.log("Done!")
        } else {
            console.log("Currently... " + counter);
            console.log("Arguments " + arguments.length + "  " + (typeof arguments[0]));
            counter--;
        }
    }
};



U(functionFactory());
