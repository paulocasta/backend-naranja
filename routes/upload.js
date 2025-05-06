const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `jugador_${Date.now()}${ext}`;
    cb(null, filename);
  }
});

const upload = multer({ storage });

router.post('/foto', upload.single('foto'), (req, res) => {
  console.log('Foto');   
  console.log(req.file); // Log the file information for debugging

  const fileUrl = `/uploads/${req.file.filename}`;
  console.log(fileUrl)
  res.json({ url: fileUrl });
});

module.exports = router;
