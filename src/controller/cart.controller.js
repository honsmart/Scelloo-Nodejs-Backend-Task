const Op = require("sequelize").Op;

const db = require("../../model");
const Product = db.product;

exports.cart = async (req, res) => {
    try {
        let cartItem = []
        let totalCartPrice = 0
        const product = await Product.findAll()

        product.map((item, idx, arr) => {
            let randomCartQuantity = Math.floor(Math.random() * (5 - 1 + 1) + 1)
            totalCartPrice += (item.productPrice * randomCartQuantity)
            cartItem.push({
                productId: item.id,
                productName: item.productName,
                productPrice: item.productPrice,
                productQuantity: randomCartQuantity
            })
        })
        res.send({
            items: cartItem,
            totalCartPrice
        });

    } catch (e) {
        res.status(500).send({
            error: e.message || "Internal server error."
        })
    }
}