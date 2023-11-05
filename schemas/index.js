const mongoose = require("mongoose"); // mongoose 패키지에서 가져와서 mongoose라는 변수에 할당

const connect = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/spa_mall") // mongodb를 통해서 연결하고 27017이라는 포트번호를 통해서 연결, 연결 했을 때 spa_mall라는 데이터베이스명을 사용해서 연결
    .catch(err => console.log(err));               // 에러 발생 시 에러에 대한 값을 err로 받아오고 cosole.log()로 err를 출력
};

mongoose.connection.on("error", err => {           // mongodb가 연결 된 후에 에러가 났을 시 에러를 err에 할당 후
  console.error("몽고디비 연결 에러", err);         //  console.error()를 통해 err 출력
});

module.exports = connect;                          // connect에 할당된 익명 함수를 밖으로 내보냄