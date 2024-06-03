const SaveNews = require("../models/saveNews.model");

const getAllSaveNews = async (req, res) => {
  try {
    const news = await SaveNews.find();
    res.status(200).json(news);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const saveNews = async (req, res) => {
  try {
    const saveNews = new SaveNews({
      saveNewsId: req.body.saveNewsId,
      user: req.id,
    });

    await saveNews.save();
    res.status(201).send({
      success: true,
      message: "Newssave is created Successfully",
      user: {
        id: req.body.saveNewsId,
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllSaveNews,
  saveNews,
};
