const musicRepository = require("../repository/music.repository");

const search = async(req, res) => {
    let title = req.query.title;
    try {   
        const music = await musicRepository.getMusicByTitle(title);
        const musics = await musicRepository.getAllMusic();
        
        if (music.success) {
            return res.status(200).render('music', { music: music.music, musics: musics["musicIndex"] })
        }
        return res.status(404).render('music', { music: false, musics: musics["musicIndex"] } )

    } catch (err) {
        return res.status(404).json({ message: "Erro interno" });
    }
}

const get = async(req, res) => {
    let title = req.params.title;

    try {
        const music = await musicRepository.getMusicByTitle(title);
        const musics = await musicRepository.getAllMusic(); 
            
        return res.status(200).render('music', { music: music.music, musics: musics["musicIndex"] })
    } catch (err) {
        return res.status(500).json({ message: err })
    }
}

module.exports = {
    search,
    get
}