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
      name: "Performance Running Shoes",
      description: "Boost your running experience with these high-performance shoes.",
      image: "performance-running-shoes.jpg",
      category: categories[0]._id,
      price: 129.99,
      quantity: 100,
      categoryDescription: categories[0].name,
    },
    
    {
      name: "Pro Basketball Sneakers",
      description: "Step up your game with these professional-grade basketball sneakers.",
      image: "pro-basketball-sneakers.jpg",
      category: categories[1]._id,
      price: 149.99,
      quantity: 90,
      categoryDescription: categories[1].name,
    },
    
    {
      name: "Casual Everyday Sneakers",
      description: "Elevate your casual style with these comfortable and stylish sneakers.",
      image: "casual-everyday-sneakers.jpg",
      category: categories[2]._id,
      price: 79.99,
      quantity: 150,
      categoryDescription: categories[2].name,
    },
    
    {
      name: "Classic High-Top Sneakers",
      description: "Add a touch of retro style with these classic high-top sneakers.",
      image: "classic-high-top-sneakers.jpg",
      category: categories[3]._id,
      price: 109.99,
      quantity: 120,
      categoryDescription: categories[3].name,
    },
    
    {
      name: "Minimalist Low-Top Sneakers",
      description: "Embrace simplicity with these sleek and minimalist low-top sneakers.",
      image: "minimalist-low-top-sneakers.jpg",
      category: categories[4]._id,
      price: 89.99,
      quantity: 180,
      categoryDescription: categories[4].name,
    },
    
    {
      name: "Stylish Skateboard Shoes",
      description: "Show off your skateboarding skills in style with these trendy shoes.",
      image: "stylish-skateboard-shoes.jpg",
      category: categories[5]._id,
      price: 74.99,
      quantity: 130,
      categoryDescription: categories[5].name,
    },
    
    {
      name: "Performance Training Sneakers",
      description: "Maximize your training sessions with these high-performance sneakers.",
      image: "performance-training-sneakers.jpg",
      category: categories[6]._id,
      price: 139.99,
      quantity: 110,
      categoryDescription: categories[6].name,
    },
    
    {
      name: "Comfortable Walking Sneakers",
      description: "Stay comfortable during long walks with these supportive walking sneakers.",
      image: "comfortable-walking-sneakers.jpg",
      category: categories[7]._id,
      price: 89.99,
      quantity: 160,
      categoryDescription: categories[7].name,
    },
   
    {
      name: "Versatile Athletic Sneakers",
      description: "Suit up for various sports activities with these versatile athletic sneakers.",
      image: "versatile-athletic-sneakers.jpg",
      category: categories[8]._id,
      price: 119.99,
      quantity: 140,
      categoryDescription: categories[8].name,
    },
    
    {
      name: "Iconic Classic Sneakers",
      description: "Channel timeless style with these iconic and classic sneakers.",
      image: "iconic-classic-sneakers.jpg",
      category: categories[9]._id,
      price: 99.99,
      quantity: 170,
      categoryDescription: categories[9].name,
    },
    
    {
      name: "Luxury Designer Sneakers",
      description: "Step into luxury with these high-end and fashionable designer sneakers.",
      image: "luxury-designer-sneakers.jpg",
      category: categories[10]._id,
      price: 299.99,
      quantity: 60,
      categoryDescription: categories[10].name,
    },
    
    {
      name: "Elevated Platform Sneakers",
      description: "Elevate your style with these trendy elevated platform sneakers.",
      image: "elevated-platform-sneakers.jpg",
      category: categories[11]._id,
      price: 114.99,
      quantity: 130,
      categoryDescription: categories[11].name,
    },
    
    {
      name: "Gym-Ready Training Shoes",
      description: "Get ready to hit the gym with these supportive and comfortable training shoes.",
      image: "gym-ready-training-shoes.jpg",
      category: categories[12]._id,
      price: 94.99,
      quantity: 180,
      categoryDescription: categories[12].name,
    },
    
    {
      name: "Fashionable Street Sneakers",
      description: "Stay stylish on the streets with these fashionable and chic sneakers.",
      image: "fashionable-street-sneakers.jpg",
      category: categories[13]._id,
      price: 109.99,
      quantity: 120,
      categoryDescription: categories[13].name,
    },
  
    {
      name: "Playful Kids Sneakers",
      description: "Let your kids play in style with these fun and playful sneakers.",
      image: "playful-kids-sneakers.jpg",
      category: categories[14]._id,
      price: 59.99,
      quantity: 200,
      categoryDescription: categories[14].name,
    },
   
    {
      name: "Rugged Outdoor Hiking Boots",
      description: "Conquer the outdoors with these rugged and durable hiking boots.",
      image: "rugged-outdoor-hiking-boots.jpg",
      category: categories[15]._id,
      price: 159.99,
      quantity: 100,
      categoryDescription: categories[15].name,
    },
  ]);
  console.log("products seeded");

  await User.create([
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
      firstName: "Mike",
      lastName: "jones",
      email: "mike@testmail.com",
      password: "password12345",
      isAdmin: false,
      orders: [
        {
          products: [products[6]._id, products[3]._id, products[5]._id],
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
      firstName: "BossMan",
      lastName: "Hashim",
      email: "Hashim@email.com",
      password: "Password12345",
      isAdmin: true,
      orders: [
        products[2]._id, products[1]._id, products[5]._id
      ],
    },
  ]);

  console.log("users seeded");
  process.exit();
});