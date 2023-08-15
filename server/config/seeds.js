const db = require("./connection");
const { User, Product, Category } = require("../models");

db.once("open", async () => {
  await Category.deleteMany();
  await Product.deleteMany();
  await User.deleteMany();

  const categories = await Category.insertMany([
    { name: "Running Shoes" },
    { name: "Basketball Shoes" },
    { name: "Casual Sneakers" },
    { name: "High Top Sneakers" },
    { name: "Low Top Sneakers" },
    { name: "Skate Shoes" },
    { name: "Training Shoes" },
    { name: "Walking Shoes" },
    { name: "Athletic Sneakers" },
    { name: "Classic Sneakers" },
    { name: "Designer Sneakers" },
    { name: "Platform Sneakers" },
    { name: "Gym Shoes" },
    { name: "Fashion Sneakers" },
    { name: "Kids Sneakers" },
    { name: "Outdoor Shoes" },
  ]);
  console.log("categories seeded");
  const products = await Product.insertMany([
    {
      "name": "Classic White Sneakers",
      "description": "A timeless pair of white sneakers suitable for any occasion.",
      "image": "classic-white-sneakers.jpg",
      "category": categories[9]._id,
      "price": 99.99,
      "quantity": 150,
    },
    {
      "name": "High-Top Athletic Shoes",
      "description": "Elevate your sports performance with these high-top athletic shoes.",
      "image": "high-top-athletic-shoes.jpg",
      "category": categories[0]._id,
      "price": 119.99,
      "quantity": 80
    },
    {
      "name": "Colorful Street Sneakers",
      "description": "Make a statement on the streets with these vibrant and colorful sneakers.",
      "image": "colorful-street-sneakers.jpg",
      "category": categories[2]._id,
      "price": 89.99,
      "quantity": 200
    },
    {
      "name": "Lightweight Running Shoes",
      "description": "Experience ultimate comfort during your runs with these lightweight shoes.",
      "image": "lightweight-running-shoes.jpg",
      "category": categories[0]._id,
      "price": 129.99,
      "quantity": 120
    },
    {
      "name": "Casual Slip-On Sneakers",
      "description": "Effortlessly stylish slip-on sneakers for your casual outings.",
      "image": "casual-slip-on-sneakers.jpg",
      "category": categories[2]._id,
      "price": 79.99,
      "quantity": 250
    },
    {
      "name": "Modern High-Top Sneakers",
      "description": "Stay on-trend with these modern high-top sneakers.",
      "image": "modern-high-top-sneakers.jpg",
      "category": categories[3]._id,
      "price": 109.99,
      "quantity": 100
    },
    {
      "name": "Canvas Skate Shoes",
      "description": "Express your skater style with these comfortable canvas skate shoes.",
      "image": "canvas-skate-shoes.jpg",
      "category": categories[5]._id,
      "price": 69.99,
      "quantity": 180
    },
    {
      "name": "Athletic Training Shoes",
      "description": "Boost your training sessions with these performance-driven athletic shoes.",
      "image": "athletic-training-shoes.jpg",
      "category": categories[6]._id,
      "price": 139.99,
      "quantity": 90
    },
    {
      "name": "Urban Lifestyle Sneakers",
      "description": "Perfectly blend style and comfort with these urban lifestyle sneakers.",
      "image": "urban-lifestyle-sneakers.jpg",
      "category": categories[2]._id,
      "price": 94.99,
      "quantity": 160
    },
    {
      "name": "Adventure Hiking Boots",
      "description": "Conquer the trails with these rugged and durable hiking boots.",
      "image": "adventure-hiking-boots.jpg",
      "category": categories[15]._id,
      "price": 159.99,
      "quantity": 70
    },
    {
      "name": "Classic Leather Sneakers",
      "description": "Embrace a timeless look with these classic leather sneakers.",
      "image": "classic-leather-sneakers.jpg",
      "category": categories[9]._id,
      "price": 104.99,
      "quantity": 140
    },
    {
      "name": "Sleek Minimalist Sneakers",
      "description": "Achieve an understated elegance with these sleek minimalist sneakers.",
      "image": "sleek-minimalist-sneakers.jpg",
      "category": categories[3]._id,
      "price": 89.99,
      "quantity": 200
    },
    {
      "name": "Elevated Platform Sneakers",
      "description": "Elevate your style with these trendy elevated platform sneakers.",
      "image": "elevated-platform-sneakers.jpg",
      "category": categories[10]._id,
      "price": 114.99,
      "quantity": 120
    },
    {
      "name": "Gym-Ready Athletic Sneakers",
      "description": "Get ready to hit the gym with these supportive and comfortable athletic sneakers.",
      "image": "gym-ready-athletic-sneakers.jpg",
      "category": categories[6]._id,
      "price": 99,
      "quantity": 200
    },
    // ... continue with more products ...
  ]);
  console.log("products seeded");

  await User.create({
    firstName: "Pamela",
    lastName: "Washington",
    email: "pamela@testmail.com",
    password: "password12345",
    isAdmin: false,
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[0]._id],
      },
    ],
  },

  {
    firstName: "Pamela",
    lastName: "Washington",
    email: "pamela@testmail.com",
    password: "password12345",
    isAdmin: false,
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[0]._id],
      },
    ],
  },
  {
    firstName: "Ermi",
    lastName: "B",
    email: "Ermi@email.com",
    password: "Password12345",
    isAdmin: true,
    orders: [  
      products[3]._id, products[2]._id, products[7]._id
    ],
  },
  {
    firstName: "E",
    lastName: "B",
    email: "e@email.com",
    password: "Password12345",
    role: "admin",
    orders: [  
      products[3]._id, products[2]._id, products[7]._id
    ],
  }
  
  );

  console.log("users seeded");

  process.exit();
});
