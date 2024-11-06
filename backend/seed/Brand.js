const Brand = require("../models/Brand");

const brands = [
  { _id: "65a7e20102e12c44f59943da", name: "Dairy Delight" },
  { _id: "65a7e20102e12c44f59943db", name: "Fresh Eggs Co." },
  { _id: "65a7e20102e12c44f59943dc", name: "Golden Bread" },
  { _id: "65a7e20102e12c44f59943dd", name: "Fruits Paradise" },
  { _id: "65a7e20102e12c44f59943de", name: "Vegetable Garden" },
  { _id: "65a7e20102e12c44f59943df", name: "Organic Harvest" },
  { _id: "65a7e20102e12c44f59943e0", name: "Nature's Best" },
  { _id: "65a7e20102e12c44f59943e1", name: "Farm Fresh" },
  { _id: "65a7e20102e12c44f59943e2", name: "Pure Dairy" },
  { _id: "65a7e20102e12c44f59943e3", name: "Whole Grain Bakery" },
  { _id: "65a7e20102e12c44f59943e4", name: "Green Leaf Farms" },
  { _id: "65a7e20102e12c44f59943e5", name: "Seasonal Fruits" },
  { _id: "65a7e20102e12c44f59943e6", name: "Fresh Veggies Co." },
  { _id: "65a7e20102e12c44f59943e7", name: "Eggcellent Choice" },
  { _id: "65a7e20102e12c44f59943e8", name: "Heritage Breads" },
];

exports.seedBrand = async () => {
  try {
    await Brand.insertMany(brands);
    console.log('Brand seeded successfully');
  } catch (error) {
    console.log(error);
  }
};
