import multer from 'multer';
import path from 'path'

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${new Date().toISOString()}-${file.originalname}`.replace(/:/g, '-'));
  }
});

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if(ext !== '.jpg' && ext !== '.pdf') {
        return cb({ message: 'Unsupported file format, only jpg and pdf files are allowed' }, false);
    }
    cb(null, true);
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter
});

export default upload;
