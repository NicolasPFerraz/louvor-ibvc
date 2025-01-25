const router = require("express").Router();
const homeRouter = require("./home.router");
const adminRouter = require("./admin.router");
const musicRouter = require("./music.router");

const verifyUser = require("../middlewares/verify-user");

router.use("/", homeRouter)
router.use("/admin", adminRouter)
router.use("/music", musicRouter)

/* If a request url doesn't exists */
router.use((req, res, ) => {
    res.status(404).json({ message: "Sorry, the requested resource could not be found." });
});

module.exports = router;