const express = require("express"); // "express"라는 라이브러리를 express 라는 변수에 할당
const router = express.Router(); // express.Router()라는 함수를 실행하여 router라는 변수에 할당

// // localgost:3000/api/ GET
// router.get('/', (req, res) => {  // 기본경로 ('/')에 들어왔을 때 
//     res.send("default url for goods.js GET Method"); // res.send()를 사용하여 반환
// })

// // localhost:3000/api/about GET
// router.get('/about', (req, res) => { // '/about'이라는 경로로 들어왔을 때
//     res.send("goods.js about PATH"); // res(반환 한다) send(반환 할 데이터)=> "good.js about PATH"
// });


// /routes/goods.js
const goods = [
    {
        goodsId: 4,
        name: "상품 4",
        thumbnailUrl:
            "https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg",
        category: "drink",
        price: 0.1,
    },
    {
        goodsId: 3,
        name: "상품 3",
        thumbnailUrl:
            "https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg",
        category: "drink",
        price: 2.2,
    },
    {
        goodsId: 2,
        name: "상품 2",
        thumbnailUrl:
            "https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg",
        category: "drink",
        price: 0.11,
    },
    {
        goodsId: 1,
        name: "상품 1",
        thumbnailUrl:
            "https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg",
        category: "drink",
        price: 6.2,
    },
];


// api만들기 조회하기 (반환하기) 상품 목록 조회API
router.get("/goods", (req, res) => {
    res.status(200).json({ "goods": goods }) // ({"goods" : goods }) 동일한 이름일 경우 ({goods}) 로 표현 가능
});

// api 상세 목록 만들기 상품 상세 조회 API
router.get("/goods/:goodsId", (req, res) => {
    const { goodsId } = req.params;           // 객체 구조분해할당


    // let result = null;
    // for (const good of goods) {               // goods안에 있는 데이터를 for of 문을 통해 good 안에 할당
    //     if (Number(goodsId) === good.goodsId) {       // good에 있는 goodsId가 goodId와 같을 경우 
    //         result = good;
    //     }
    // }

    // 위와 아래는 같은 코드

    const [result] = goods.filter((good) => Number(goodsId) === good.goodsId)  // goods라는 배열에 있는 정보를 하나하나씩 good라는 변수에 할당
    // good.goodsId === Number(goodsId) 일 경우 입력값을 return

    res.status(200).json({ "detail:": result });
});


const Cart = require("../schemas/cart.js");
router.post("/goods/:goodsId/cart", async (req, res) => {
    const { goodsId } = req.params;
    const { quantity } = req.body;

    const existCarts = await Cart.find({ goodsId });
    if (existCarts.length) {
        return res.status(400).json({
            success: false,
            errorMessage: "이미 장바구니에 해당하는 상품이 존재합니다",
        })
    }

    await Cart.create({ goodsId, quantity });

    res.json({ result: "success" });
})

// 수정
router.put("/goods/:goodsId/cart", async (req, res) => {
    const { goodsId } = req.params;
    const { quantity } = req.body;

    const existsCarts = await Cart.find({ goodsId });
    if (existsCarts.length) {
        await Cart.updateOne(
            { goodsId: goodsId }, // goodsId에 해당하는 값이 있을 때
            { $set: { quantity: quantity } }
        ) // 수정한다
    }
    res.status(200).json({ success: true });
})

// 제거
router.delete("/goods/:goodsId/cart", async (req, res) => {
    const { goodsId } = req.params;

    const existsCarts = await Cart.find({ goodsId });
    if (existsCarts.length) {
        await Cart.deleteOne({ goodsId });
    }

    res.json({ result: "success" });
})

const Goods = require("../schemas/goods.js");                                  // "../" => 상위 폴더로 빠져나옴
router.post("/goods/", async (req, res) => {                                            // 
    const { goodsId, name, thumbnailUrl, category, price } = req.body;         // req안에 있는 body를 통해서 입력받음

    const goods = await Goods.find({ goodsId });

    if (goods.length) {
        return res.status(400).json({
            success: false,
            errorMessage: "이미 존재하는 GoodsId입니다."
        });
    }

    const createdGoods = await Goods.create({ goodsId, name, thumbnailUrl, category, price });       // 데이터베이스에 접근 할 시에는 await으로 동기적으로

    res.json({ goods: createdGoods }); // json타입으로 데이터를 반환, goods라는 키를 가지고, createsGoods라는 값을 가지고
})

module.exports = router; // module.exports 를 통해 router를 밖으로 내보냄