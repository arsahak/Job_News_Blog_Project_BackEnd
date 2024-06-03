require("dotenv").config();
const User = require("../models/user.model");
const TopCategory = require("../models/topCategory.model");
const Category = require("../models/category.model");
const SubCategory = require("../models/subCategory.model");
const cloudinary = require("cloudinary").v2;
const saltRounds = 10;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getPublicIdFromUrl = (imageUrl) => {
  const urlParts = imageUrl.split("/");
  const fileName = urlParts[urlParts.length - 1];
  const publicId = fileName.split(".")[0]; // Remove file extension
  return publicId;
};

const getAllCategorys = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createCategory = async (req, res) => {
  const { topCategory, category } = req.body;

  try {
    const category = await Category.findOne({
      topCategory: topCategory,
    });

    if (category) return res.status(400).send("Category name already exists");

    const imgUrl = await cloudinary.uploader.upload(req.body.image, {
      folder: process.env.CLOUDINARY_CLOUD_FOLDER_NAME,
      unique_filename: true,
    });

    const newCategory = new Category({
      topCategory,
      category,
    });

    await newCategory.save();
    res.status(201).send({
      success: true,
      message: "Category is created Successfully",
      data: {
        topCategory: newCategory.topCategory,
        title: newCategory.category.title,
        image: newCategory.category.image,
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ id: req.params.id });
    category.topCategory = req.body.topCategory;
    category.title = req.body.title;
    category.image = req.body.image;

    await category.save();
    res.status(200).send({
      success: true,
      message: "Category is update Successfully",
    });
  } catch (error) {
    res.status(500).res.send({
      success: false,
      message: "Category is not update",
      error: error,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ user: req.id });

    // Extract public ID from the image URL
    const publicId = getPublicIdFromUrl(category.image);

    // Delete the image from Cloudinary
    const result = await cloudinary.api.delete_resources(
      [`newsblog/${publicId}`],
      {
        type: "upload",
        resource_type: "image",
      }
    );

    // Check if the deletion was successful
    if (result.deleted[`newsblog/${publicId}`] === "deleted") {
      // Delete the news from MongoDB
      await Category.deleteOne({ user: req.id });

      res.status(200).json({
        success: true,
        message: "Category is deleted",
        id: req.id,
      });
    } else {
      // Handle deletion failure
      res.status(500).json({
        success: false,
        message: "Failed to delete category",
        id: req.id,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting category",
      id: req.id,
      error: error.message, // Include error message for debugging
    });
  }
};

module.exports = {
  getAllCategorys,
  createCategory,
  updateCategory,
  deleteCategory,
};
