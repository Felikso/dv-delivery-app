import bcryptjs from 'bcryptjs';
import crypto from 'crypto';

import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import {
	ORDER_VERYFIKATION,
	MAIL_FOOTER,
	MAIL_HEADER,
	WELCOME_EMAIL,
	PASSWORD_RESET,
} from '../utils/emailTemplates.js';
import nodemailer from 'nodemailer';
import userModel from '../models/userModel.js';
import {
	customErrors,
	customInfo,
	resetPassUrl,
	verifyUrl,
} from '../utils/variables.js';

import transporter from '../utils/transporter.js';

const signup = async (req, res) => {
	const { email, password, name } = req.body;

	try {
		if (!email || !password || !name) {
			throw new Error('uzupełnij wszystkie pola');
		}

		const userAlreadyExists = await userModel.findOne({ email });

		if (userAlreadyExists) {
			return res
				.status(400)
				.json({ success: false, message: customErrors.userAlreadyExists });
		}

		const hashedPassword = await bcryptjs.hash(password, 10);
		const verificationToken = Math.floor(
			100000 + Math.random() * 900000
		).toString();

		const user = new userModel({
			email,
			password: hashedPassword,
			name,
			verificationToken,
			verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
			address: {},
			cartData: {},
		});

		await user.save();
		generateTokenAndSetCookie(res, user._id);

		var mailOptions = {
			from: process.env.EMAIL,
			to: user.email,
			subject: 'Potwierdzenie adresu email',
			html:
				MAIL_HEADER.replace('{headTitle}', 'Weryfikacja adresu email') +
				ORDER_VERYFIKATION.replace(
					'{verificationCode}',
					verificationToken
				).replace(
					'{mailPath}',
					process.env.REACT_APP_CLIENT_URL + `/${verifyUrl}`
				) +
				MAIL_FOOTER,
		};
		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log(customInfo.emailSent + info.response);
			}
		});

		res.status(201).json({
			success: true,
			message: customErrors.userCreatedSuccessfully,
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

const verifyEmail = async (req, res) => {
	const { code } = req.body;
	try {
		const user = await userModel.findOne({
			verificationToken: code,
			verificationTokenExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res
				.status(400)
				.json({ success: false, message: customErrors.expiriedCode });
		}

		user.isVerified = true;
		user.verificationToken = undefined;
		user.verificationTokenExpiresAt = undefined;
		await user.save();

		var mailOptions = {
			from: process.env.EMAIL,
			to: user.email,
			subject: 'Mail powitalny',
			html:
				MAIL_HEADER.replace('{headTitle}', 'Weryfikacja adresu email') +
				WELCOME_EMAIL.replace('{name}', user.name).replace(
					'{mailPath}',
					process.env.REACT_APP_CLIENT_URL
				) +
				MAIL_FOOTER,
		};

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log(customInfo.emailSent + info.response);
			}
		});

		res.status(200).json({
			success: true,
			message: customInfo.emailSentSuccessfully,
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		console.log(customErrors.inVeirfyEmail, error);
		res.status(500).json({ success: false, message: customErrors.serverError });
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await userModel.findOne({ email });
		if (!user) {
			return res
				.status(400)
				.json({ success: false, message: customErrors.invalidCredentials });
		}

		const isPasswordValid = await bcryptjs.compare(password, user.password);
		if (!isPasswordValid) {
			return res
				.status(400)
				.json({ success: false, message: customErrors.invalidCredentials });
		}

		if (!user.isVerified) {
			return res
				.status(400)
				.json({ success: false, message: customErrors.usernNotVerified });
		}

		generateTokenAndSetCookie(res, user._id);

		user.lastLogin = new Date();
		await user.save();

		res.status(200).json({
			success: true,
			message: customInfo.loggedSuccessfully,
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		console.log(customErrors.inLogin, error);
		res.status(400).json({ success: false, message: error.message });
	}
};

const logout = async (req, res) => {
	res.clearCookie('token');
	req.body.userId = '';
	req.userId = '';
	res
		.status(200)
		.json({ success: true, message: customInfo.loggedSuccessfully });
};

const forgotPassword = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await userModel.findOne({ email });

		if (!user) {
			return res
				.status(400)
				.json({ success: false, message: customErrors.userNotFound });
		}

		if (user.resetPasswordToken) {
			var mailOptions = {
				from: process.env.EMAIL,
				to: user.email,
				subject: 'Przypomnienie hasła',
				html:
					MAIL_HEADER.replace('{headTitle}', 'Przypomnienie hasła') +
					PASSWORD_RESET.replace('{name}', user.name).replace(
						'{mailPath}',
						`${process.env.REACT_APP_CLIENT_URL}${resetPassUrl}/${user.resetPasswordToken}`
					) +
					MAIL_FOOTER,
			};
			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					console.log(error);
				} else {
					console.log(customInfo.emailSent + info.response);
				}
			});
		} else {
			const resetToken = crypto.randomBytes(20).toString('hex');
			const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

			user.resetPasswordToken = resetToken;
			user.resetPasswordExpiresAt = resetTokenExpiresAt;

			await user.save();

			var mailOptions = {
				from: process.env.EMAIL,
				to: user.email,
				subject: 'Przypomnienie hasła',
				html:
					MAIL_HEADER.replace('{headTitle}', 'Przypomnienie hasła') +
					PASSWORD_RESET.replace('{name}', user.name).replace(
						'{mailPath}',
						`${process.env.REACT_APP_CLIENT_URL}${resetPassUrl}/${resetToken}`
					) +
					MAIL_FOOTER,
			};

			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					console.log(error);
				} else {
					console.log(customInfo.emailSent + info.response);
				}
			});
			res
				.status(200)
				.json({ success: true, message: customInfo.sentCodeToEmail });
		}
	} catch (error) {
		console.log(customErrors.forgotPassword, error);
		res.status(400).json({ success: false, message: error.message });
	}
};

const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		const user = await userModel.findOne({
			resetPasswordToken: token,
			resetPasswordExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res
				.status(400)
				.json({ success: false, message: customInfo.expiriedCode });
		}

		const hashedPassword = await bcryptjs.hash(password, 10);

		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;
		await user.save();

		var mailOptions = {
			from: process.env.EMAIL,
			to: user.email,
			subject: 'Hasło pomyślnie zresetowane',
			html:
			MAIL_HEADER.replace('{headTitle}', 'Przypomnienie hasła') +
			PASSWORD_RESET.replace('{name}', user.name).replace(
				'{mailPath}',
				`${process.env.REACT_APP_CLIENT_URL}${resetPassUrl}/${user.resetPasswordToken}`
			) +
			MAIL_FOOTER,
		};

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log(customInfo.emailSent + info.response);
			}
		});

		res
			.status(200)
			.json({ success: true, message: customInfo.resetSuccessfull });
	} catch (error) {
		console.log(customErrors.resetPassword, error);
		res.status(400).json({ success: false, message: error.message });
	}
};

const setAddressData = async (req, res) => {
	try {
		const { token } = req.params;
		const { address } = req.body;

		const user = await userModel.findOne({
			token: token,
		});

		if (!user) {
			return res
				.status(400)
				.json({ success: false, message: customErrors.address });
		}

		user.address = address;
		await user.save();

		var mailOptions = {
			from: process.env.EMAIL,
			to: user.email,
			subject: 'Zmiana domyślnego adresu dostawy',
			html:
			MAIL_HEADER.replace('{headTitle}', 'Przypomnienie hasła') +
			PASSWORD_RESET.replace('{name}', user.name).replace(
				'{mailPath}',
				process.env.REACT_APP_CLIENT_URL
			) +
			MAIL_FOOTER,
		};
		

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log(customInfo.emailSent + info.response);
			}
		});

		res
			.status(200)
			.json({ success: true, message: customInfo.resetSuccessfull });
	} catch (error) {
		console.log(error.message);
		res.status(400).json({ success: false, message: error.message });
	}
};

const checkAuth = async (req, res) => {
	try {
		const user = await userModel.findById(req.userId).select('-password');
		if (!user) {
			return res
				.status(400)
				.json({ success: false, message: customErrors.userNotFound });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log(customErrors.inCheckAuth, error);
		res.status(400).json({ success: false, message: error.message });
	}
};

const userEmails = async (req, res) => {
	try {
		const users = await userModel.find({});
		let emailsArr = [];
		Object.entries(users).map(([item, i]) => {
			if (!emailsArr.includes(i['email'])) {
				emailsArr.push(i['email']);
			}
		});

		res.json({ success: true, data: emailsArr });
	} catch (error) {
		res.json({ success: false, message: errorMessage });
	}
};

export {
	login,
	signup,
	verifyEmail,
	logout,
	forgotPassword,
	resetPassword,
	checkAuth,
	setAddressData,
	userEmails,
};
