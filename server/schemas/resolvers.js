const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');
const {authorizeRoles} = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Product.find(params).populate('category');
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    //added admin user
    users: async (parent, args, context) =>  {
      if (context.user) {
        console.log(`${context.user.isAdmin === true} here is the code `)

        if (context.user.isAdmin === true) { // Check if the user is an admin
          const user = await User.find({isAdmin: false});
          console.log(user)
          return user
        } else {
          throw new AuthenticationError('You do not have permission to view users');
        }
      }
    
      throw new AuthenticationError('Not logged in');
    },
  
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const line_items = [];

      const { products } = await order.populate('products');

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`]
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in'); // throw new AuthenticationError('You need to be logged in!');
    },
//added admin user
// findUsers: async (parent, args, context) =>  {
//   if (context.user) {
//     console.log(`${context.user.isAdmin === true} here is the code `)

//     if (context.user.isAdmin === true) { // Check if the user is an admin
//       return await User.find();
//     } else {
//       throw new AuthenticationError('You do not have permission to view users');
//     }
//   }

//   throw new AuthenticationError('Not logged in');
// },
  
    addProduct: async (parent,args,context)=> {
      console.log(context)
      if (context.user) {
        return Product.create({ ...args })
      }

      throw new AuthenticationError('Not logged in');
    },
      
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    updateProduct: async (parent, { _id, quantity }, context) => {
      authorizeRoles('admin')(context.req, context.res, () => {
        // Only if the user has the required role (admin), proceed with updating the product
        const decrement = Math.abs(quantity) * -1;

        return Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
      });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      
      return { token, user };
    }
  }
};

module.exports = resolvers;
