const _ = require("lodash");

function test(val1,val2 = "tems") {
    console.log(val2)
}

test(1);
test(2, "segun");