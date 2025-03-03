import express from "express";
import sequelize from "./config/config.js";
import cors from "cors";
import projectRoutes from './routes/projectRoute.js';
import userRoutes from './routes/userRoute.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from "./routes/taskRoutes.js";
import pengerjaanRoutes from "./routes/pengerjaanRoutes.js";
import upload from "./middlewares/uploadMiddleware.js";
import LogPengerjaanRoutes from "./routes/logPengerjaanRoutes.js";
import totalRoutes from "./routes/totalRoutes.js";

const app = express();
const port = process.env.PORT || 3090;
// const upload = multer();

// mengizinkan url frontend untuk mengakses api
app.use(
  cors({
      origin: ["http://localhost:3000", ""],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
  })
)

// Middleware untuk membaca JSON dan Url-encoded
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Middleware untuk menangani `Multipart/form-data`
// app.use(upload.none()); // membuat req.body agar terbaca ketika menggunakan FormData
app.use('/uploads', express.static('uploads'));

const init = async () => {
  try {
    await sequelize.authenticate();
    console.log('Success connected to the database');
    await sequelize.sync();
    console.log("Database & tables created");

    app.use("/api/v1", projectRoutes);
    app.use('/api/v1', userRoutes);
    app.use('/api/v1', authRoutes);
    app.use('/api/v1', taskRoutes);
    app.use('/api/v1', LogPengerjaanRoutes);
    app.use('/api/v1', totalRoutes);
    app.use('/api/v1', upload.fields([
        { name: 'file_github', maxCount: 1 },
        { name: 'file_ss', maxCount: 1 }
      ]),
    pengerjaanRoutes);

    app.get("/", (req, res) => {
      res.send("Hello World!");
      console.log("Response sent");
    });

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

init()