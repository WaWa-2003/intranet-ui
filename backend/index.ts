import express from "express";
import cors from "cors";
import { poolPromise } from "../src/services/db";
import sql from "mssql";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();
const PORT = 5000;

app.use(
    cors({
        origin: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(express.json());


// Ensure the directory exists
const uploadDir = path.join(__dirname, "public/images");

console.log("Upload directory path:", uploadDir);

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer to save images in the "../images/" directory
const storage = multer.diskStorage({

    
    destination: (req, file, cb) => {

        console.log('upload ts ignore here')

        cb(null, uploadDir);

    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), (req, res): void => {
    console.log("File upload route triggered");
    console.log("Uploaded file details:", req.file);

    if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return; // Explicit return to satisfy TypeScript
    }

    const imagePath = `/images/${req.file.filename}`;
    console.log("Image path is " + imagePath);
    res.status(201).json({ message: "Image uploaded successfully", imagePath });
});




// Get all records
app.get("/cards", async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query("SELECT * FROM SystemCardData");
        res.json(result.recordset);
    } catch (err) {
        console.error("Error fetching records:", (err as Error).message);
        res.status(500).json({ error: "Error fetching records" });
    }
});

// Get a single record by ID
app.get("/cards/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("id", sql.Int, id)
            .query("SELECT * FROM SystemCardData WHERE id = @id");
        res.json(result.recordset[0]);
    } catch (err) {
        console.error("Error fetching record:", (err as Error).message);
        res.status(500).json({ error: "Error fetching record" });
    }
});

// Create a new record with image upload
app.post("/cards", upload.single("image"), async (req, res) => {
  
    console.log(req.file);
    try {
        const { title, description, status, weblink } = req.body;
    
        const imagePath = req.file ? `/images/${req.file.filename}` : null;

        const pool = await poolPromise;
        await pool
            .request()
            .input("title", sql.VarChar, title)
            .input("image", sql.Text, imagePath)
            .input("description", sql.Text, description)
            .input("status", sql.Bit, status)
            .input("weblink", sql.Text, weblink)
            .query(
                "INSERT INTO SystemCardData (title, image, description, status, weblink) VALUES (@title, @image, @description, @status, @weblink)"
            );

        res.status(201).json({ message: "Card created", imagePath });
    } catch (err) {
        console.error(
            "Error uploading image or saving record:",
            (err as Error).message
        );
        res.status(500).json({ error: "Failed to upload image or save record" });
    }
});

// Update a record with image upload
app.put("/cards/:id", upload.single("image"), async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, weblink } = req.body;
        const imagePath = req.file ? `/images/${req.file.filename}` : null;

        const pool = await poolPromise;
        const updateQuery = imagePath
            ? "UPDATE SystemCardData SET title = @title, image = @image, description = @description, status = @status, weblink = @weblink WHERE id = @id"
            : "UPDATE SystemCardData SET title = @title, description = @description, status = @status, weblink = @weblink WHERE id = @id";

        const request = pool
            .request()
            .input("id", sql.Int, id)
            .input("title", sql.VarChar, title)
            .input("description", sql.Text, description)
            .input("status", sql.Bit, status)
            .input("weblink", sql.Text, weblink);

        if (imagePath) request.input("image", sql.Text, imagePath);

        await request.query(updateQuery);
        res.json({ message: "Card updated", imagePath });
    } catch (err) {
        console.error("Error updating record:", (err as Error).message);
        res.status(500).json({ error: "Failed to update record" });
    }
});

// Delete a record
app.delete("/cards/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await poolPromise;
        await pool
            .request()
            .input("id", sql.Int, id)
            .query("DELETE FROM SystemCardData WHERE id = @id");
        res.json({ message: "Card deleted" });
    } catch (err) {
        console.error("Error deleting record:", (err as Error).message);
        res.status(500).json({ error: "Failed to delete record" });
    }
});

app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);
