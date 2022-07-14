import express from 'express';
import { addPost, deletePost, getPost, getPosts, updatePost } from './controllers/Post.js'
import upload from './middlewares/uploadImage.js';
const app = express();
const port = 3000;

/* resolve path __dirname */
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/* end */

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/post', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use('/update/:id', upload.single('photo'), updatePost)
app.use('/delete/:id', deletePost)
app.use('/:id', getPost)

app.use('/', getPosts)
app.use('/addPost', upload.single('photo'), addPost)

app.listen(port, () => console.log(`Apps run on http://localhost:${port}`));