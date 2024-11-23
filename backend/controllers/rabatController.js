import { NEW_RABAT, MAIL_FOOTER, MAIL_HEADER } from '../utils/emailTemplates.js';
import nodemailer from 'nodemailer';
import rabatModel from '../models/rabatModel.js';
import userModel from '../models/userModel.js';
import { customErrors, customInfo } from '../utils/variables.js';

import transporter from '../utils/transporter.js';

const setRabat = async (req, res) => {
	const { rabatValue, rabatCodeExpiresAt, emailArr } = req.body;

	try {
		if (emailArr?.length > 0) {
			let emailDosentExistArr = [];
			for (const mail of emailArr) {
				const userExists = await userModel.findOne({ email: mail });
				if (!userExists) {
					emailDosentExistArr.push(mail);
				}
			}
			let emailsArr = [];
			if (emailDosentExistArr[0] == 'all') {
				const usersArr = await userModel.find({});

				Object.entries(usersArr).map(([item, i]) => {
					if (!emailsArr.includes(i['email'])) {
						emailsArr.push(i['email']);
					}
				});
			} else if (emailDosentExistArr.length > 0) {
				return res.status(400).json({
					success: false,
					message:
						customErrors.userDosentExists +
						': ' +
						emailDosentExistArr.join(', '),
				});
			}
		}

		if (!rabatValue) {
			throw new Error(customErrors.rabatValue);
		}

		const hours24 = 24 * 60 * 60 * 1000;
		let countRabatDays = 7 * hours24; 

		if (rabatCodeExpiresAt) {
			countRabatDays = rabatCodeExpiresAt * hours24; 
		}

		const rabatCode = Math.floor(100000 + Math.random() * 900000).toString();

		const rabat = new rabatModel({
			rabatCode,
			rabatValue,
			rabatCodeExpiresAt: Date.now() + countRabatDays,
			emailArr,
		});

		await rabat.save();

		let sendEmailArr = emailArr ? emailArr : usersArr;

		let rabatExpires =
			rabatCodeExpiresAt == 1
				? 'jutro'
				: rabatCodeExpiresAt == 7
				? 'za tydzień'
				: 'za miesiąc';

		sendEmailArr.forEach((mail) => {
			var mailOptions = {
				from: process.env.EMAIL,
				to: mail,
				subject: 'Kod rabatowy',
				html:
					MAIL_HEADER.replace('{headTitle}', 'Nowy kod rabatowy') +
					NEW_RABAT.replace('{rabat}', rabatValue * 100)
						.replace('{expires}', rabatExpires)
						.replace('{mailPath}', process.env.REACT_APP_CLIENT_URL) +
					MAIL_FOOTER,
			};
			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					console.log(error);
				} else {
					console.log(customInfo.emailSent + info.response);
				}
			});
		});

		res.status(201).json({
			success: true,
			message: customInfo.rabatCreatedSuccessfully,
			rabatCode: rabatCode,
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

const verifyRabat = async (req, res) => {
	const { rabatCode, email } = req.body;

	try {
		const rabat = await rabatModel.findOne({
			rabatCode: rabatCode,
			rabatCodeExpiresAt: { $gt: Date.now() },
		});
		if (!rabat) {
			return res
				.status(400)
				.json({ success: false, message: customErrors.expiriedCode });
		}
		if (rabat.emailArr.includes(`used_${email}`)) {
			return res
				.status(400)
				.json({ success: false, message: customErrors.rabatUsed });
		}
		if (rabat.emailArr.includes('all')) {
			rabat.emailArr.push(email);
		}
		let index = rabat.emailArr.indexOf(email);
		if (index !== -1) {
			rabat.emailArr.splice(index, 1);
			const userRabat = await userModel.findOne({ email: email });
			if (userRabat) {
				if (Object.keys(userRabat.rabat).length === 0) {
					userRabat.rabat = {
						rabatCode: rabatCode,
						rabatValue: rabat.rabatValue,
					};
					rabat.emailArr.push(`used_${email}`);
					userRabat.save();
				} else {
					return res
						.status(400)
						.json({ success: false, message: customErrors.rabatExists });
				}
			}
		}
		if (rabat.emailArr.length === 0) {
			await rabatModel.findByIdAndDelete(rabat._id);
			res.status(200).json({
				success: true,
				message: customInfo.rabatUsed,
				data: rabat.rabatValue,
			});
		} else {
			await rabat.save();
			res.status(200).json({ success: true, data: rabat.rabatValue });
		}
	} catch (error) {
		console.log(customErrors.inVeirfyEmail, error);
		res.status(500).json({ success: false, message: customErrors.serverError });
	}
};

const deleteRabat = async (req, res) => {
	const { rabatCode } = req.body;

	try {
		if (req.body.userId) {
			const user = await userModel.findById(req.body.userId);

			if (user?.rabat?.rabatCode == rabatCode) {
				const updateRabat = await rabatModel.findOne({
					rabatCode: rabatCode,
				});

				const filteredArray = updateRabat.emailArr.filter(
					(item) => item !== `used_${user.email}`
				);

				if (!updateRabat.emailArr.includes('all')) {
					filteredArray.push(user.email);
				}

				updateRabat.emailArr = filteredArray;
				user.rabat = {};
				await updateRabat.save();
				await user.save();
				res
					.status(200)
					.json({ success: true, message: customInfo.rabatDeleted });
			} else {
				res
					.status(500)
					.json({ success: false, message: customErrors.userDosentHaveRabat });
			}
		}
	} catch (error) {}
};

export { setRabat, verifyRabat, deleteRabat };
