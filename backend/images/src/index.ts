import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import sharp from "sharp";

const app = express();

/* ===============================
   CONFIG UPLOAD DIR (OBLIGATOIRE)
================================ */

if (!process.env.UPLOAD_DIR) {
  throw new Error("UPLOAD_DIR environment variable is not defined");
}

const uploadDir = process.env.UPLOAD_DIR;
fs.mkdirSync(uploadDir, { recursive: true });

/* ===============================
   CORS
================================ */

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.options("*", cors());

/* ===============================
   MULTER STORAGE
================================ */

const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, uploadDir);
  },
  filename: function (_, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase() || ".bin";
    cb(null, `file-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({ storage });

/* ===============================
   UPLOAD ROUTE
================================ */

app.post(
  "/upload",
  upload.single("file"),
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({ error: "Aucun fichier reçu" });
        return;
      }

      const outputFilename = `optimized-${Date.now()}.webp`;
      const outputPath = path.join(uploadDir, outputFilename);

      await sharp(req.file.path)
        .rotate()
        .resize({
          width: 1600, 
          withoutEnlargement: true,
        })
        .webp({
          quality: 85, 
          effort: 6,
        })
        .toFile(outputPath);

      fs.unlinkSync(req.file.path);

      res.status(201).json({
        status: "success",
        filename: `/files/${outputFilename}`,
      });
    } catch (err) {
      console.error("Erreur upload image :", err);
      res.status(500).json({
        error: "Erreur lors de l’upload de l’image",
      });
    }
  },
);

/* ===============================
   STATIC FILES (CACHE + HEADERS)
================================ */

app.use(
  "/files",
  express.static(uploadDir, {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".webp")) {
        res.setHeader("Content-Type", "image/webp");
      }

      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    },
  }),
);

/* ===============================
   SERVER
================================ */

const PORT = Number(process.env.PORT) || 3002;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Images service running on port ${PORT}`);
});
