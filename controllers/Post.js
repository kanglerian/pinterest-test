import Model from '../models/index.js';

export const addPost = (req, res) => {
  try {
      Model.Posts.create({
        title: req.body.title,
        photo: req.file.filename
      })
      res.redirect('/');
    } catch (error) {
      res.json({
        message: error.message,
      });
    }
}