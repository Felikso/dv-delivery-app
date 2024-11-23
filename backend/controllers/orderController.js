import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import transporter from '../utils/transporter.js';
import {
	customErrors,
	customInfo,
	odrerSlug,
	errorMessage,
} from '../utils/variables.js';

import {
	ORDER_VERYFIKATION,
	MAIL_HEADER,
	MAIL_FOOTER,
} from '../utils/emailTemplates.js';


const placeOrder = async (req, res) => {
	const verificationCode = Math.floor(
		100000 + Math.random() * 900000
	).toString();

	try {
		let rabatValue = 0;
		if (req.body.userId) {
			const user = await userModel.findById(req.body.userId);
			rabatValue = user?.rabat ? user.rabat.rabatValue : 0;
		}
		const itemsArr = req.body.items;

		const newOrder = new orderModel({
			userId: req.body.userId,
			date: Date.now(),
			items: itemsArr,
			amount: req.body.amount,
			address: req.body.address,
			rabat: rabatValue,
			verificationCode,
			verificationCodeExpiresAt: Date.now() + 60 * 60 * 1000, 
		});

		await newOrder.save();

			if (req.body.userId) {
				const user = await userModel.findById(req.body.userId);
				user.rabat = {};
				user.cartData = {};
				if (req.body.address) {
				user.address = req.body.address;
				}
				await user.save();
			}

			let itemsForMail = ''

			itemsArr.map(item=>{
				itemsForMail += '<p>'+item.name+' x '+item.quantity+'</p>'
			})
	
		var mailOptions = {
			from: process.env.EMAIL,
			to: req.body.address.email,
			subject: 'Kod weryfikacyjny dla zamówienia',

			html: 
			MAIL_HEADER
			.replace(
				'{headTitle}',
				'Weryfikacja zamówienia'
			) +
			ORDER_VERYFIKATION
			.replace(
				'{verificationCode}',
				verificationCode
			)
			.replace(
				'{mailPath}',
				process.env.REACT_APP_CLIENT_URL+`/${odrerSlug}`
			)
			.replace(
				'{itemsForMail}',
				itemsForMail
			)
			.replace(
				'{headTitle}',
				'Weryfikacja zamówienia'
			) +
			MAIL_FOOTER
		};

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				return res.json({success:true,message:'shortPassMess'})
			}
		});

		res.json({ success: true, message: customInfo.orderSuccess });
	} catch (error) {
		console.log(error);
		
		res.json({ success: false, message: customErrors.orderFiled });
	}
};

const verifyOrderCode = async (req, res) => {
	const { verificationCode, _id } = req.body;

	try {
		const veryfiedOrder = await orderModel.findOne({
			verified: true,
			verificationCode: verificationCode,
		});

		if (veryfiedOrder) {
			return res.status(200).json({
				success: true,
				message: customInfo.orderAllreadyVeryried,
				verified: true,
				data: veryfiedOrder,
			});
		}

		const order = await orderModel.findOne({
			verificationCode: verificationCode,
			verificationCodeExpiresAt: { $gt: Date.now() },
		});

		if (!order) {
			return res
				.status(400)
				.json({ success: false, message: customErrors.expiriedCode });
		}

		if (order._id == _id) {

			if (order._id == _id) {
				order.verified = true;

				await order.save();
				return res.status(200).json({
					success: true,
					message: customInfo.emailSentSuccessfully,
					verified: true,
				});
			} else {
				return res
					.status(400)
					.json({ success: false, message: customErrors.failedData });
			}
		}
		return res
			.status(400)
			.json({ success: false, message: customErrors.expiriedCode });
	} catch (error) {
		console.log(customErrors.inVeirfyEmail, error);
		res.status(500).json({ success: false, message: customErrors.serverError });
	}
};

const userOrders = async (req, res) => {
	let orderId = req.body.userId ? req.body.userId : '';
	let codeId = req.body.codeId;
	try {
		if (req.body.userId) {
			const orders = await orderModel.find({ userId: orderId });
			if (orders) {
				console.log(orders);

				return res.json({ success: true, data: orders });
			}
		}
		if (codeId) {
			const order = await orderModel.find({ verificationCode: codeId });
			console.log(order);
			return res.json({ success: true, data: order });
		}

		if (orderId) {
			const orders = await orderModel.find({ userId: orderId });
			if (orders) {
				return res.json({ success: true, data: orders });
			}
		}
	} catch (error) {
		console.log(error);

		res.json({ success: false, message: customErrors.loadListField });
	}
};


const listOrders = async (req, res) => {
	try {
		const orders = await orderModel.find({});
		res.json({ success: true, data: orders });
	} catch (error) {
		res.json({ success: false, message: customErrors.loadListField });
	}
};

const updateStatus = async (req, res) => {
	try {
		await orderModel.findByIdAndUpdate(req.body.orderId, {
			status: req.body.status,
		});
		res.json({ success: true, message: customInfo.statusUpdated });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: customErrors.statusUpdateFiled });
	}
};

const removeOrder = async (req, res) => {
	try {
		await orderModel.findByIdAndDelete(req.body.orderId);
		res.json({ success: true, message: customInfo.orderRemoved });
	} catch {
		res.json({ success: false, message: errorMessage });
	}
};

export {
	placeOrder,
	userOrders,
	listOrders,
	updateStatus,
	removeOrder,
	verifyOrderCode,
};
