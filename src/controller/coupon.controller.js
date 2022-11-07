const db = require("../../model");
const Coupon = db.coupon;

exports.coupon = async (req, res) => {
  const {couponCode,items,totalCartPrice} = req.body
  let discountType;
  let couponType;
  let minItem;
  let minPrice;
  let priceOff;
  let percentageOff;
  let couponCondition;
  let discountedPrice = 0;
  try {
    const coupon = await Coupon.findOne({ where: { couponCode: couponCode } });
    if (coupon === null) {
      return res.status(404).send({success:false,msg:"Invalid Coupon"})
    }
    discountType = coupon.discountType;
    couponType = coupon.couponType;
    minItem = coupon.minItem;
    minPrice = coupon.minPrice;
    priceOff = coupon.priceOff;
    percentageOff = coupon.percentageOff;
    /*
    discountType
    1 represent fixed amount off the total price 
    2 represent Percent-off total price
    3 represent Percent off or fixed amount off the total price, whichever results in the greatest discounts
    */
    couponCondition = calCouponType(couponType,minItem,minPrice,items?.length,totalCartPrice);
    if(couponCondition?.success){
    if(discountType == "fixed"){
      discountedPrice = parseFloat(totalCartPrice) - parseInt(priceOff);
    }
      if(discountType == "percentage"){
        discountedPrice = parseFloat(totalCartPrice) - ((percentageOff/100) * parseFloat(totalCartPrice) );
      }
      if(discountType == "fixed-percetage"){
        let calPacentage = ((percentageOff/100) * parseFloat(totalCartPrice) )
        discountedPrice = parseFloat(totalCartPrice) - Math.max(calPacentage,priceOff)
      }
      return res.status(200).send({discountedPrice})
    }else{
      return res.status(200).send({discountedPrice:0})
    }
    
   
   function calCouponType(couponType,minItem,minPrice,totalItem,totalPrice){
    // couponType
    // 1 represent ONLY PRICE TEST
    // 2 represent ONLY QUANTITY TEST
    // 3 represent PRICE TEST & QUANTITY TEST
    if(couponType === "price" && totalPrice >= minPrice){
      return {msg:"Passed Price Test", success:true}
    }else if(couponType === "quantity" && totalItem >= minItem){
      return {msg:"Passed QUANTITY Test", success:true}
    }else if(couponType === "price-quantity" && totalPrice >= minPrice && totalItem >= minItem){
      return {msg:"Passed QUANTITY Test", success:true}
    }else{
      return {msg:"Failed", success:false}
    }
   }
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the User."
    });
  }
}