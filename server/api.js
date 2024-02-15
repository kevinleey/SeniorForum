import express from "express";
import routerModule from "router";
import auth from "./auth.js";

const router = express.Router();

router.get('/protected-endpoint', auth, (req, res) => {
    //handle logic here
    res.json({ message: "Authenticated endpoint reached!" });
});

export default router;