// import category model
let Category = require("../models/category");

// Register a Category
const registerCategory = (req, res) => {
  // Obtain data from JSON
  let params = req.body;
  // Create new instance for category
  let category = new Category();
  // Save incoming request data into collection
  category.names = params.names;
  category.description = params.description;
  // Save the info into MongoDB
  category.save((err, saveCategory) => {
    // If an error comes in from Mongo Server
    if (err) {
      res.status(500).send({ message: "Error connecting to the server" });
    } else {
      if (saveCategory) {
        res.status(200).send({ category: saveCategory });
      } else {
        res.status(401).send({ message: "Could not register category" });
      }
    }
  });
};

// Search categories
const searchCategory = (req, res) => {
  // Obtain ID from category
  let id = req.params["id"];
  // Search for the category by its ID
  Category.findById({ _id: id }, (err, categoryData) => {
    // If error when connecting to DB
    if (err) {
      res.status(500).send({ message: "Error connecting to the server" });
    } else {
      if (categoryData) {
        res.status(200).send({ category: categoryData });
      } else {
        res
          .status(401)
          .send({ message: "Category not found or does not exist" });
      }
    }
  });
};

// List categories with or without filter
const listCategory = (req, res) => {
  // If we filter by name save it
  let names = req.params["names"];
  // Search in the categories
  Category.find({ names: new RegExp(names, "i") }, (err, categoryData) => {
    // If error when connecting to DB
    if (err) {
      res.status(500).send({ message: "Error connecting to the server" });
    } else {
      if (categoryData) {
        res.status(200).send({ category: categoryData });
      } else {
        res
          .status(401)
          .send({ message: "Category not found or does not exist" });
      }
    }
  });
};

// Edit Category
const editCategory = (req, res) => {
  // Obtain the id of the category
  let id = req.params["id"];
  // Obtain the incoming data to edit from API
  let params = req.body;
  // Search by id and edit
  Category.findByIdAndUpdate(
    { _id: id },
    { names: params.names, description: params.description },
    (err, categoryData) => {
      if (err) {
        res.status(500).send({ message: "Error connecting to the server" });
      } else {
        if (categoryData) {
          res.status(200).send({ category: categoryData });
        } else {
          res.status(401).send({ message: "Category could not be edited" });
        }
      }
    }
  );
};

// Eliminate a Category
const eliminateCategory = (req, res) => {
  // Obtain the id
  let id = req.params["id"];
  // Eliminate the category by ID
  Category.findByIdAndDelete({ _id: id }, (err, categoryData) => {
    if (err) {
      res.status(500).send({ message: "Error connecting to the server" });
    } else {
      if (categoryData) {
        res.status(200).send({ category: categoryData });
      } else {
        res.status(401).send({ message: "Category could not be edited" });
      }
    }
  });
};
// Export module
module.exports = {
  registerCategory,
  searchCategory,
  listCategory,
  editCategory,
  eliminateCategory,
};
