const musicRepository = require("../repository/music.repository");


module.exports = async(req, res) => {
    try {
        const start = Date.now();
        const musics = await musicRepository.getAllMusic() || []; 
        console.log(`Query time: ${Date.now() - start}ms`);

        return res.status(200).render('home', { musics: musics["musicIndex"] })
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}