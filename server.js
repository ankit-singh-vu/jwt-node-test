const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const SECRET_KEY = "your_secret_key"; // Change this to a secure key

// Initialize SQLite Database
const db = new sqlite3.Database("./users.db", (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Connected to SQLite database.");
        db.run(
            `CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                username TEXT UNIQUE, 
                password TEXT,
                email TEXT UNIQUE,
                role TEXT DEFAULT 'user',
                full_name TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                profile_image TEXT,
                permissions TEXT
            )`
        );
    }
});

// Register User
app.post("/register", (req, res) => {
    const { username, password, email, role, fullName, profileImage, permissions } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    
    db.run(
        "INSERT INTO users (username, password, email, role, full_name, profile_image, permissions) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [username, hashedPassword, email, role, fullName, profileImage, JSON.stringify(permissions)],
        function (err) {
            if (err) {
                return res.status(400).json({ error: "User already exists or invalid input" });
            }
            res.json({ message: "User registered successfully" });
        }
    );
});

// Login User & Generate JWT Token
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
        if (err || !user) {
            return res.status(400).json({ error: "User not found" });
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const accessToken = jwt.sign(
            {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        const refreshToken = jwt.sign(
            { id: user.id },
            SECRET_KEY,
            { expiresIn: "7d" } // Refresh token lasts 7 days
        );

        res.json({ accessToken, refreshToken });
    });
});

app.post("/refresh-token", (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(403).json({ error: "No refresh token provided" });
    }

    jwt.verify(refreshToken, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Invalid refresh token" });
        }

        // Issue new access token
        const newAccessToken = jwt.sign(
            { id: decoded.id },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.json({ accessToken: newAccessToken });
    });
});

// Middleware to Verify JWT
const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(403).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        req.user = decoded; // Store all user details in req.user
        next();
    });
};

// Fetch User Details (Protected)
app.get("/user", verifyToken, (req, res) => {
    res.json({
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        role: req.user.role,
        fullName: req.user.fullName,
        createdAt: req.user.createdAt,
        profileImage: req.user.profileImage,
        permissions: req.user.permissions
    });
});

// Start Server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
