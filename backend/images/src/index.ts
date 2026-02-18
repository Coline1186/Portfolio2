import express, { Request, Response } from "express"
import cors from "cors"
import multer from "multer"
import path from "path"
import fs from "fs"

const app = express()
app.use(
   cors({
      origin: [
         "http://localhost:5173",
      ],
   })
)

const storage = multer.diskStorage({
   destination: function (_, __, cb) {
      cb(null, path.join(__dirname, "../uploads"))
   },
   filename: function (_, file, cb) {
      console.log("%c⧭", "color: #ace2e6", file)
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
      cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname)
   },
})
const upload = multer({ storage: storage })

app.post(
   "/upload",
   upload.single("file"),
   async (req: Request, res: Response): Promise<void> => {
      try {
         if (!req.file) {
            res.status(400).json({ error: "Aucun fichier reçu" })
            return
         }

         res.status(201).json({
            status: "success",
            filename: `/files/${req.file.filename}`,
         })
      } catch (err) {
         console.error("Erreur upload image :", err)
         res.status(500).json({ error: "Erreur lors de l’upload de l’image" })
      }
   }
)

app.get("/files/:filename", (req, res) => {
   const file = path.join(__dirname + "/../uploads", req.params.filename)
   console.log("file", file)
   fs.readFile(file, (err, data) => {
      if (err) {
         res.writeHead(404, { "Content-Type": "text" })
         res.write("Le fichier n'a pas été trouvé")
         res.end()
      } else {
         res.writeHead(200, { "Content-Type": "application/octet-stream" })
         res.write(data)
         res.end()
      }
   })
   
})
app.listen(3002, () => {
   console.log("Launched on http://localhost:3002")
})
