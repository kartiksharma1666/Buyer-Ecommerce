const Product = require("../models/Product");

const products = [
  {
    _id: "65a7e45902e12c44f599444e",
    title: "Organic Milk",
    description: "Fresh organic milk sourced from local farms.",
    price: 3.99,
    discountPercentage: 10.00,
    stockQuantity: 100,
    brand: "65a7e20102e12c44f59943da",
    category: "65a7e24602e12c44f599442c",
    thumbnail: "https://www.otipy.com/_next/image?url=https%3A%2F%2Fimg.crofarm.com%2Fimages%2Fprodsmall%2F10849_1711975504.4637327_pdp.webp&w=640&q=75",
    images: [
      "https://www.otipy.com/_next/image?url=https%3A%2F%2Fimg.crofarm.com%2Fimages%2Fprodsmall%2F10849_1711975504.4637327_pdp.webp&w=640&q=75",
    ],
    expiry: new Date("2024-12-31").toISOString(),
    isDeleted: false,
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "65a7e45902e12c44f599444f",
    title: "Farm Fresh Eggs",
    description: "Free-range eggs from happy hens.",
    price: 2.49,
    discountPercentage: 5.00,
    stockQuantity: 50,
    brand: "65a7e20102e12c44f59943e7",
    category: "65a7e24602e12c44f599442e",
    thumbnail: "https://www.otipy.com/_next/image?url=https%3A%2F%2Fimg.crofarm.com%2Fimages%2Fprodsmall%2F10849_1711975504.4637327_pdp.webp&w=640&q=75",
    images: [
      "https://www.otipy.com/_next/image?url=https%3A%2F%2Fimg.crofarm.com%2Fimages%2Fprodsmall%2F10849_1711975504.4637327_pdp.webp&w=640&q=75",
    ],
    expiry: new Date("2024-11-15").toISOString(),
    isDeleted: false,
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "65a7e45902e12c44f5994450",
    title: "Whole Grain Bread",
    description: "Nutritious bread made from whole grains.",
    price: 1.99,
    discountPercentage: 7.00,
    stockQuantity: 75,
    brand: "65a7e20102e12c44f59943db",
    category: "65a7e24602e12c44f599442c",
    thumbnail: "https://www.otipy.com/_next/image?url=https%3A%2F%2Fimg.crofarm.com%2Fimages%2Fprodsmall%2F10849_1711975504.4637327_pdp.webp&w=640&q=75",
    images: [
      "https://www.otipy.com/_next/image?url=https%3A%2F%2Fimg.crofarm.com%2Fimages%2Fprodsmall%2F10849_1711975504.4637327_pdp.webp&w=640&q=75",
    ],
    expiry: new Date("2025-01-20").toISOString(),
    isDeleted: false,
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "65a7e45902e12c44f5994451",
    title: "Fresh Strawberries",
    description: "Sweet and juicy strawberries, perfect for desserts.",
    price: 4.50,
    discountPercentage: 15.00,
    stockQuantity: 30,
    brand: "65a7e20102e12c44f59943de",
    category: "65a7e24602e12c44f599442c",
    thumbnail: "https://www.otipy.com/_next/image?url=https%3A%2F%2Fimg.crofarm.com%2Fimages%2Fprodsmall%2F10849_1711975504.4637327_pdp.webp&w=640&q=75",
    images: [
      "https://www.otipy.com/_next/image?url=https%3A%2F%2Fimg.crofarm.com%2Fimages%2Fprodsmall%2F10849_1711975504.4637327_pdp.webp&w=640&q=75",
    ],
    expiry: new Date("2024-11-10").toISOString(),
    isDeleted: false,
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "65a7e45902e12c44f5994452",
    title: "Green Bell Peppers",
    description: "Fresh green bell peppers, great for salads.",
    price: 0.99,
    discountPercentage: 10.00,
    stockQuantity: 40,
    brand: "65a7e20102e12c44f59943e8",
    category: "65a7e24602e12c44f599442c",
    thumbnail: "https://www.otipy.com/_next/image?url=https%3A%2F%2Fimg.crofarm.com%2Fimages%2Fprodsmall%2F10849_1711975504.4637327_pdp.webp&w=640&q=75",
    images: [
      "https://www.otipy.com/_next/image?url=https%3A%2F%2Fimg.crofarm.com%2Fimages%2Fprodsmall%2F10849_1711975504.4637327_pdp.webp&w=640&q=75",
    ],
    expiry: new Date("2024-12-05").toISOString(),
    isDeleted: false,
    updatedAt: new Date().toISOString(),
  },
  // Add more products as needed
];

exports.seedProduct = async () => {
  try {
    await Product.deleteMany({}); // Clear existing products
    await Product.insertMany(products);
    console.log("Products seeded successfully");
  } catch (error) {
    console.error("Error seeding products:", error);
  }
};
