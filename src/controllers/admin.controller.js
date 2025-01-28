const Admin = require("../models/Admin");
const authService = require("../services/auth.service");
const musicRepository = require("../repository/music.repository");
const vagalumeService = require("../services/vagalume.service");

// Função para login do usuário admin
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(401).render("admin/login", { message: "Credenciais inválidas" });
    }

    try {
        const admin = await authService(username, password);

        if (admin.success) {
            res.header('authorization', 'Bearer ' + admin.token);
            res.set('Authorization', 'Bearer ', admin.token);
            res.cookie('adminToken','Bearer '+ admin.token, { //salva token no cliente em um cookie
                signed: true,
                maxAge: 3600000, // 1 hora
                secure: false, //usando server localhost que nao usa HTTPS, antes de subir para prod trocar para true
                httpOnly:true
            })  

            return res.redirect("/admin");
        } else {
            return res.status(401).render("admin/login", { message: "Credenciais inválidas" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// Função para obter todas as músicas
const getAllMusic = async (req, res, message = null, status = 200, success = true) => {
    try {
        const music = await musicRepository.getAllMusic();

        if (music.success) {
            return res.status(status).render("admin/dashboard", {
                musics: music.musicIndex,
                message: message,
                success: success
            });
        } else {
            return res.status(401).json(music);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// Função para buscar músicas usando uma API de terceiros
const searchMusic = async (req, res) => {
    const { term, limit } = req.body;

    if (limit > 10) {
        return res.status(404).render("admin/search_music_form", {
            message: "Insira um valor até 10"
        });
    }

    try {
        const music = await vagalumeService.search(term, limit);

        if (music.success) {
            const jsonData = await music.response.json();

            for (let doc of jsonData.response.docs) {
                delete doc.langID;
            }

            return res.status(200).render("admin/search_music", {
                message: "Music found: ",
                musicList: jsonData.response.docs
            });
        } else {
            return res.status(401).json({ message: "Música não encontrada" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// Função para obter detalhes de uma música
const getMusic = async (id) => {
    try {
        const music = await vagalumeService.getMusic(id);

        if (music.success) {
            const jsonData = await music.response.json();
            const data = {
                title: jsonData.mus[0].name,
                author: jsonData.art.name,
                lyrics: jsonData.mus[0].text
            };
            return data;
        } else {
            return { message: music.message };
        }
    } catch (error) {
        console.log(error);
        return { message: "Internal server error" };
    }
}

// Função para importar música
const importMusic = async (req, res) => {
    try {
        const get = await getMusic(req.params.id);

        const data = {
            title: get.title,
            author: get.author,
            lyrics: get.lyrics,
            youtube_link: req.body.youtube_link
        };

        console.log(data);

        const create = await musicRepository.createMusic(
            data.title,
            data.author,
            data.lyrics,
            data.youtube_link
        );

        if (!create.success) {
            return getAllMusic(req, res, create.message, 400, false);
        }
        
        console.log("> New music added");
        return getAllMusic(req, res, create.message, 201, true);
    } catch (err) {
        console.log(err);
        res.status(500).send("Erro interno no sistema");
    }
}

// Função para deletar música
const deleteMusic = async (req, res) => {
    try {
        const deleteResult = await musicRepository.deleteMusic(req.params.id);
        console.log(req.params.id)

        if (deleteResult.success) {
            return getAllMusic(req, res, "Música deletada com sucesso", 200, true);
        } else {
            return getAllMusic(req, res, deleteResult.message, 400, false);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// Função para atualizar música
const updateMusicForm = async (req, res) => {

    const music = await musicRepository.getMusicById(req.params.id);

    res.render("admin/edit_music", {
        music: music["musicIndex"]["dataValues"]
    });
}

const updateMusic = async (req, res) => {
    const { title, author, lyrics, youtube_link } = req.body;
    const { id } = req.params;

    try {
        const music = await musicRepository.getMusicById(id);
        if (!music) {
            return res.status(404).json({ success: false, message: music.message });
        }
        
        const updatedMusic = await musicRepository.updateMusic(id, title, author, lyrics, youtube_link);
        
        if (updatedMusic.success) {
            return getAllMusic(req, res, "Música editada com sucesso", 200)
        } else {
            return res.status(400).render("admin/edit_music", { 
                success: false, 
                message: "Campos inválidos",
                music: { title, author, lyrics, youtube_link} 
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Erro interno ao atualizar música" });
    }
}

// Exportando as funções
module.exports = {
    loginUser,
    getAllMusic,
    searchMusic,
    getMusic,
    importMusic,
    deleteMusic,
    updateMusicForm,
    updateMusic,
};