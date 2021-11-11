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
          .populate("savedProducts");
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
  },
};

module.exports = resolvers;
