const _ = require("lodash");

let a = [{ type: 1, value: 55 }, { type: 2, value: 55 }, { type: 3, value: 55 }];

let b = a.filter(element => element.type === 2);

console.log(a[_.random((a.length - 1),0,false)]);