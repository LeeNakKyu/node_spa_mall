const express = require("express");
const router = express.Router();

const Cart = require("../schemas/cart.js");
const Goods = require("../schemas/goods.js");

// localhost:3000/api/carts GET Method
router.get("/carts", async(req,res)=>{
    const carts = await Cart.find({});         // cart안에 있는 모든 데이터 값
     // [
    //     {goodsId, quantity}
    //  ];
    const goodsIds = carts.map((cart) =>{
        return cart.goodsId;                   // cart안에 있는 goodsId만 가지고 있는 데이터 값
    })
    // [2, 11, 19];

    const goods = await Goods.find({goodsId: goodsIds});
    // Gods에 해당하는 모든 정보를 가지고 올건데,
    // 만약 goodsIds 변수 안에 존재하는 값일 때에만 조회하라

    const results = carts.map((cart) => {
        return {
            "quantity": cart.quantity,
            "goods": goods.find((item)=> item.goodsId === cart.goodsId)
        }
    })

    res.json({
        "carts": results,
    })
});






module.exports = router; // router를 외부로 내보냄