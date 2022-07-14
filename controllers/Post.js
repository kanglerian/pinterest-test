import Model from '../models/index.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getPosts = async (req, res) => {
  try {
    const hasil = await Model.Posts.findAll();
    res.status(200).json({
      message: 'success',
      data: hasil
    });
  } catch (error) {
    res.json({
      message: error.message
    })
  }
}

export const getPost = async (req, res) => {
  try {
    const hasil = await Model.Posts.findOne({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({
      message: 'Berhasil!',
      data: hasil
    });
  } catch (error) {
    res.json({
      message: error.message
    })
  }
}

export const updatePost = async (req, res) => {
  try {
    const post = await Model.Posts.findOne({
      where: {
        id: req.params.id
      }
    });
    removeImage(post.photo);
    const hasil = await Model.Posts.update({
      title: req.body.title,
      photo: req.file.filename
    },{
      where: {
        id: post.id
      }
    });
    res.status(200).json({
      message: 'Data telah diperbarui!'
    });
  } catch (error) {
    res.json({
      message: error.message
    })
  }
}

export const addPost = async (req, res) => {
  try {
    await Model.Posts.create({
      title: req.body.title,
      photo: req.file.filename
    })
    res.status(200).json({
      message: 'Gambar berhasil diunggah!'
    });
    res.redirect('/');
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
}

export const deletePost = async (req, res) => {
  try {
    const hasil = await Model.Posts.findOne({
      where: {
        id: req.params.id
      }
    })
    await Model.Posts.destroy({
      where: {
        id: hasil.id
      }
    });
    removeImage(hasil.photo);
    res.redirect('/');
    res.status(200).json({
      message: 'Berhasil dihapus!'
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
}

const removeImage = (filePath) => {
  // console.log('filePath:', filePath);
  // console.log('dirName:', __dirname);
  filePath = path.join(__dirname, '..', 'public/images', filePath);
  // console.log(filePath);
  fs.unlink(filePath, err => console.log(err));
}