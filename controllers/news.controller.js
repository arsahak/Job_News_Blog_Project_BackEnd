const News = require('../models/news.model');

const getAllNews = async (req, res) => {
  try {
    const news = await News.find({ user: req.id });
    res.status(200).json(news);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createNews = async (req, res) => {
  const createNews = new News({
    ...req.body,
    user: req.id,
  });

  try {
    await createNews.save();
    res.status(201).send({
      success: true,
      message: 'News is created Successfully',
      user: {
        id: req.id,
        email: req.email,
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
    news.author = req.body.author;

    await news.save();
    res.status(200).send({
      success: true,
      message: 'User is update Successfully',
    });
  } catch (error) {
    res.status(500).res.send({
      success: false,
      message: 'User is not update',
      error: error,
    });
  }
};

const deleteNews = async (req, res) => {
  try {
    await News.deleteOne({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: 'News is deleted',
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'News is not deleted',
      error: error,
    });
  }
};

module.exports = {
  getAllNews,
  deleteNews,
  updateNews,
  createNews,
};
