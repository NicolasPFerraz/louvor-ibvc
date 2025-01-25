const router = require("express").Router();
const musicController = require("../controllers/music.controller")

router.get("/:title", (req, res) => {
    musicController.get(req, res);
});

router.get("/search/title", (req, res) => {
    musicController.search(req, res)
});

module.exports = router;