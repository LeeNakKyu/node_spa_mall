// math.js의 3 방법 사용 시 module.exports = add; 
//const add = require("./math.js"); // module.exports 를 통해 밖으로 내보낸 add를 require을 통해 가지고 옴

// onsole.log(add(10,30));


// math.js 의 1, 2, 4 방법 사용 시
const {add} = require("./math.js");

console.log(add(10,30));