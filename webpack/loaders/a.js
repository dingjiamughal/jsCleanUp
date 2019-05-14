function factorial(num) {
    if (num <= 1) {
        return 1;
    }
    else {
        return num * factorial(num - 1);
    }
}

console.log(factorial(4));

function box(a, b) {
    return a + b;
}

function foo() {
    return box.call(this, ...arguments);
}

console.log(foo(2, 3));
