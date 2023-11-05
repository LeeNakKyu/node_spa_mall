
// 3.
// function add(a,b) {
//     return a + b;
// }

// 4. 모듈을 호출했을 때, add 키 값에는 add 변수 함수가 가지고 있는 값이 할당된다.
const add = (a, b) => {
    return a+ b;
}

exports.add = add;


// 1. 모듈을 호출했을 때, add키 값에는 (a,b){return a + b;} 익명함수가 할당되는 방법이다
// exports.add = function (a,b) {
//     return a + b;
// }

// 2. 모듈을 호출했을 때, add 키 값에는 add 함수가 들어가는 방법이다
// module.exports = {add : add};

// 3. 모듈 그 자체를 바로 add 함수를 할당한다
// module.exports = add; // module.exports 를 통해 add를 밖으로 내보냄

