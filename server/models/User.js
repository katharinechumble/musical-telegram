const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const productSchema = require("./Product");

const userSchema = new Schema(
	{
		firstname: {
			type: String,
			required: true,
		},
		lastname: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: [/.+@.+\..+/, "Must use a valid email address"],
		},
		password: {
			type: String,
			required: true,
		},
		savedProducts: [productSchema],
		cartProducts: [productSchema],
	},
	// set this to use virtual below
	{
		toJSON: {
			virtuals: true,
		},
	}
);

// hash user password
userSchema.pre("save", async function (next) {
	if (this.isNew || this.isModified("password")) {
		const saltRounds = 10;
		this.password = await bcrypt.hash(this.password, saltRounds);
	}

	next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

userSchema.virtual("productCount").get(function () {
	return this.savedProducts.length;
});

userSchema.virtual("cartCount").get(function () {
	return this.cartProducts.length;
});

const User = model("User", userSchema);

module.exports = User;
