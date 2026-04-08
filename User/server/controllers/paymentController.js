import { instance } from "../server.js"



export const processPayment= async (req,res)=>{

    const options={
        amount: Number(req.body.amount*100),
        currency: "INR",
    }

    const order = await instance.orders.create(options);
    res.status(200).json({
    success:true,
    order,
  })
}


export const getKey = async (req,res)=>{
    res.status(200).json({
        key:process.env.RAZORPAY_KEY_ID,
    })
}

export const paymentVerification= async (req,res)=>{
    console.log(req.body);
    res.status(200).json({
        success:true,
    })
}
