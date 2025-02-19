import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
})

// const diskStorage = multer({dest: 'uploads'})

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpg", "image/png", "image/jpeg"];
  if(allowedMimeTypes.includes(file.mimetype)){
    cb(null, true);
  } else {
    cb(new Error('Only JPG, PNG and JPEG formats are allowed!'), false);
  }
}

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // Maksimal 2MB
  },
  fileFilter,
});

export default upload;