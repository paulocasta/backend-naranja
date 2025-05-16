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
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

module.exports = router;
