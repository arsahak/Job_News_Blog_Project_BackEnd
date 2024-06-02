require("dotenv").config();
const News = require("../models/news.model");
const cloudinary = require("cloudinary").v2;

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

const getAllNews = async (req, res) => {
  try {
    const news = await News.find({ user: req.id });
    res.status(200).json(news);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createNews = async (req, res, next) => {
  try {
    const imgUrl = await cloudinary.uploader.upload(req.body.image, {
      folder: process.env.CLOUDINARY_CLOUD_FOLDER_NAME,
      unique_filename: true,
    });

    const createNews = new News({
      title: req.body.title,
      body: req.body.body,
      image: imgUrl.url,
      author: req.body.author,
      user: req.id,
    });

    await createNews.save();
    res.status(201).send({
      success: true,
      message: "News is created Successfully",
      user: {
        id: req.id,
        email: req.email,
        image: imgUrl,
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateNews = async (req, res) => {
  try {
    const news = await News.findOne({ id: req.params.id });
    news.title = req.body.title;
    news.body = req.body.title;
    news.image = req.body.image;
    news.author = req.body.author;

    await news.save();
    res.status(200).send({
      success: true,
      message: "User is update Successfully",
    });
  } catch (error) {
    res.status(500).res.send({
      success: false,
      message: "User is not update",
      error: error,
    });
  }
};


const deleteNews = async (req, res) => {
  try {
    const news = await News.findOne({ user: req.id });

    // Extract public ID from the image URL
    const publicId = getPublicIdFromUrl(news.image);

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
      await News.deleteOne({ user: req.id });

      res.status(200).json({
        success: true,
        message: "News is deleted",
        id: req.id,
      });
    } else {
      // Handle deletion failure
      res.status(500).json({
        success: false,
        message: "Failed to delete news",
        id: req.id,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting news",
      id: req.id,
      error: error.message, // Include error message for debugging
    });
  }
};

module.exports = {
  getAllNews,
  deleteNews,
  updateNews,
  createNews,
};
