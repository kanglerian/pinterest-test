import express from 'express';
import multer from 'multer';
import { addPost } from './controllers/Post.js'

/* resolve path __dirname */
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/* end */

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

app.get('/post', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use('/addPost', upload.single('photo'), addPost)

app.listen(port, () => console.log(`Apps run on http://localhost:${port}`));