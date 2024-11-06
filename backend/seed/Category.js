const Category = require("../models/Category");

const categories = [
  { _id: "65a7e20102e12c44f59943da", name: "Milk" },
  { _id: "65a7e20102e12c44f59943db", name: "Eggs" },
  { _id: "65a7e20102e12c44f59943dc", name: "Bread" },
  { _id: "65a7e20102e12c44f59943dd", name: "Fruits" },
  { _id: "65a7e20102e12c44f59943de", name: "Vegetables" },

];

exports.seedCategory = async () => {
  try {
    await Category.insertMany(categories);
    console.log("Category seeded successfully");
  } catch (error) {
    console.log(error);
  }
};
