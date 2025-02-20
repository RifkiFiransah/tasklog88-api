import multer from "multer";
import path from "path";
import fs from "fs";

// Fungsi untuk memastikan folder target ada sebelum digunakan
const ensureDirectoryExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = "uploads/"; // Default path

    if (file.fieldname === "file_github") {
      uploadPath = "uploads/github";
    } else if (file.fieldname === "file_ss") {
      uploadPath = "uploads/ss";
    }

    ensureDirectoryExists(uploadPath); // Pastikan folder ada sebelum upload
    cb(null, uploadPath);
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