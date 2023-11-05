const express = require('express');
const app = express();
const port = 3000;
const goodsRouter = require('./routes/goods.js')  // routes라는 폴더 안에있는 goods.js파일을 가져옴 "./" => 현재 경로(SPA_MALL), goods.js 파일에 있는 router를
// 반환 하여 goodsRouter에 할당

const cartsRouter = require("./routes/carts.js")

const connect = require("./schemas");    // 폴더만 불러와도 사용 가능 const connect = require("./schemas/index.js");
connect();                                        // 가지고 온 connect에 할당된 익명함수 실행


app.use(express.json()); // request 객체 안에있는 body parser를 사용하기 위해



app.post("/", (req, res) => {   // body데이터는 post() 메서드를 쓸 떄 가장 많이 씀
  console.log(req.body);

  res.send("기본 URI에 POST 메소드가 정상적으로 실행되었습니다.");
})



// app.get("/", (req, res) => {
//   console.log(req.query);

//   res.send('정상적으로 반환되었습니다');

// })

app.get("/", (req, res) => {
  console.log(req.query);

  const obj = {
    "KeyKey" : "value 입니다",
    "이름입니다." : "이름일까요?",
  }

  res.json(obj);  //  res.status(400).json(obj); 로 status를 400번으로 전달 할 수 있음

})

app.get("/:id", (req, res) => { // router의 매개변수가 id를 통해서
  console.log(req.params);      // params에 할당

  res.send(":id URI에 정상적으로 반환되었습니다.");
});

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });


// localhost:3000/api -> goodsRouter
 app.use("/api", [goodsRouter, cartsRouter]); // 반환받은 router를 express에 적용(api에 등록), "/api"라는 경로가 추가 된 경우에는 모두 goodsRouter를 통해서 가라 app.'use' 전역미들웨어

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});