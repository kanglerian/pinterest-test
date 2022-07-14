import express from 'express';
const app = express();
const port = 3000;

import expressLayouts from 'express-ejs-layouts';
import methodOverride from 'method-override';

/* load controllers */
import { addPost, deletePost, getPost, getPosts, updatePost } from './controllers/Post.js'
/* end */

/* upload middlewares */
import upload from './middlewares/uploadImage.js';
/* end */

/* resolve path __dirname */
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/* end */

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index', {
    layout: 'layouts/main',
    title: 'Pinterest'
  });
});

app.use('/update/:id', upload.single('photo'), updatePost)
app.use('/delete/:id', deletePost)
app.use('/:id', getPost)

app.use('/', getPosts)
app.use('/addPost', upload.single('photo'), addPost)

app.listen(port, () => console.log(`Apps run on http://localhost:${port}`));