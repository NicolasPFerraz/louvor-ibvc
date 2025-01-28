const router = require("express").Router();
const homeController = require("../controllers/home.controller");

router.get("/", (req, res) => {
    homeController(req, res);
});

module.exports = router;