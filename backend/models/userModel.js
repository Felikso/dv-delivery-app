import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		email: {type: String,required: true,unique: true,},
		password: {type: String,required: true,},
		name: {type: String,required: true,},
		lastLogin: {type: Date,default: Date.now,},
		isVerified: {type: Boolean,default: false,},
		isAdmin: {type: Boolean,default: false,},
		cartData: {type: Object,default: {}},
		address: {type: Object,default: {},},
		rabat: {type: Object,default: {},},
		deletedRabatCode: {type: Array,default: []},
		resetPasswordToken: {type: String},
		resetPasswordExpiresAt: {type: Date},
		verificationToken: {type: String},
		verificationTokenExpiresAt: {type: Date},
	},
	{ minimalize: false },
	{ timestamps: true }
);

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
