const router = require("express").Router();
const verifyUser = require("../middlewares/verify-user");
const adminController = require("../controllers/admin.controller");

// GET routes 
router.get("/login", (req, res) => {
    return res.status(200).render('admin/login');
});

router.get("/", verifyUser, (req, res) => {
    adminController.getAllMusic(req, res);
});

router.get("/music/search", verifyUser, (req, res) => {
    res.render("admin/search_music_form");
});

router.get("/music/delete/:id", verifyUser, (req, res) => {
    adminController.deleteMusic(req, res)
});

router.get("/music/edit/:id", verifyUser, (req, res) => {
    adminController.updateMusicForm(req, res)
});

// POST routes

router.post("/login", (req, res) => {
    adminController.loginUser(req, res);
});

router.post("/music/search", verifyUser, (req, res) => {
    adminController.searchForMusic(req, res);
});

router.post("/music/import/:id", verifyUser, (req, res) => {
    adminController.importMusic(req, res);
});

router.post("/music/delete/:id", verifyUser, (req, res) => {
    adminController.deleteMusic(req, res);
})

router.post("/music/edit/:id", verifyUser, (req, res) => {
    adminController.updateMusic(req, res);
});

module.exports = router;