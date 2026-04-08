
import {getKey, paymentVerification} from "../controllers/paymentController.js";
import {processPayment} from "../controllers/paymentController.js";
import express from 'express';
const router=express.Router();



router.route("/payment/process").post(processPayment);
router.route("/getkey").get(getKey);
router.route("/payment/verification").post(paymentVerification);

export default router;