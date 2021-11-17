const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
	Query: {
		// pull specific user
		me: async (parent, args, context) => {
			if (context.user) {
				const userData = await User.findOne({ _id: context.user._id })
					.select("-__v -password")
					.populate("savedProducts")
					.populate("cartProducts");

				return userData;
			}

			throw new AuthenticationError("You are not logged in");
		},
	},

	Mutation: {
		addUser: async (parent, args) => {
			// const userData = {
			// 	firstname: args.firstname,
			// 	lastname: args.lastname,
			// 	username: args.username,
			// 	email: args.email,
			// };

			const user = await User.create(args);
			const token = signToken(user);

			return { token, user };
		},

		login: async (parent, { username, password }) => {
			const user = await User.findOne({ username });

			if (!user) {
				throw new AuthenticationError("Incorrect Credentials");
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError("Incorrect Credentials");
			}

			const token = signToken(user);
			return { token, user };
		},

		saveProduct: async (parent, { productData }, context) => {
			if (context.user) {
				const updatedUser = await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $push: { savedProducts: productData } },
					{ new: true }
				);
				return updatedUser;
			}
			throw new AuthenticationError("Not Logged In");
		},

		createList: async (parent, { listName }, context) => {
			if (context.user) {
				const updatedUser = await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $push: { savedLists: listName } },
					{ new: true }
				);
				return updatedUser;
			}
			throw new AuthenticationError("Not Logged In");
		},

		removeProduct: async (parent, { itemId }, context) => {
			if (context.user) {
				const updateUser = await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $pull: { savedProducts: { itemId: itemId } } },
					{ new: true }
				);
				return updateUser;
			}
			throw new AuthenticationError("Not logged in");
		},
		//removeListItem resolver.
		removeListItem: async (parent, args, context) => {
			if (context.user) {
				const updatedUser = await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $pull: { savedProducts: { itemId: args.itemId } } },
					{ new: true }
				);

				return updatedUser;
			}

			throw new AuthenticationError("You need to be logged in!");
		},
		// addToCart
		addToCart: async (parent, { productData }, context) => {
			if (context.user) {
				const updatedUser = await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $push: { cartProducts: productData } },
					{ new: true }
				);
				return updatedUser;
			}
			throw new AuthenticationError("Not Logged In");
		},

		//removeFromCart resolver.
		removeCartItem: async (parent, args, context) => {
			if (context.user) {
				const updatedUser = await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $pull: { cartProducts: { itemId: args.itemId } } },
					{ new: true }
				);

				return updatedUser;
			}

			throw new AuthenticationError("You need to be logged in!");
		},
	},
};

module.exports = resolvers;
