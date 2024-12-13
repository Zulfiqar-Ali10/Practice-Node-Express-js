import express from "express";
const router = express.Router();

const users = [
    {
        fullname: "Zulfiqar",
        email: "ali@gmail.com",
        id: 1,
    }
];

// Get all users
router.get("/", (req, res) => {
    res.status(200).json({
        error: false,
        data: users,
        msg: "Users fetched successfully",
    });
});

// Add a new user
router.post("/", (req, res) => {
    const { fullname, email } = req.body;
    users.push({ fullname, email, id: users.length + 1 });
    res.status(201).json({
        error: false,
        data: users,
        msg: "User added successfully",
    });
});

// Get user by ID
router.get("/:id", (req, res) => { // Changed to GET
    const user = users.find((data) => data.id == req.params.id); // Fixed "users" typo
    if (!user) {
        return res.status(404).json({
            error: true,
            data: null,
            msg: "User not found",
        });
    }
    res.status(200).json({
        error: false,
        data: user,
        msg: "User found successfully",
    });
});

export default router;
