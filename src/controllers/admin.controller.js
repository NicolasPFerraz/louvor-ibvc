const authService = require("../services/auth.service");
const musicRepository = require("../repository/music.repository");
const { getMusicList, getMusicById } = require("../services/lrclib.service");

// Mensagens de erro padronizadas
const ERROR_MESSAGES = {
    INVALID_CREDENTIALS: "Nome ou senha inválidos",
    INTERNAL_ERROR: "Erro interno do servidor"
};

// Função para login do usuário admin
const handleLogin = async (req, res) => {

    const { username, password } = req.body;

    try {
        if (![username, password].every(Boolean)) {
            return res.status(401).render("admin/login", {
                message: "Usuário e senha são obrigatórios"
            });
        }

        const auth = await authService(username, password);

        if (auth.success) {
            res.header('authorization', 'Bearer ' + auth.token);
            res.cookie('adminToken', 'Bearer ' + auth.token, { //Salva o token no lado do cliente em um cookie
                signed: true,
                expire: 3600000, // 1 hora
                secure: false, //usando server localhost que nao usa HTTPS, antes de subir para prod trocar para true
                httpOnly: true
            })
            return res.redirect("/admin");
        }
        return res.status(401).render("admin/login", {
            message: ERROR_MESSAGES.INVALID_CREDENTIALS
        });

    } catch (error) {
        console.error("> Erro ao autenticar usuário: " + error);
        return res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
    }
}

// Função para retornar todas as músicas
const getAllMusic = async (req, res, message, status) => {
    try {
        const musics = await musicRepository.getAllMusic();

        if (musics.success) {
            return res.status(status ?? 200).render("admin/dashboard", {
                success: true,
                message: message ?? '',
                musics: musics.list,
            });
        }
        return res.status(404).render("admin/dashboard", {
            message: musics.message ?? "Nenhuma música encontrada"
        });

    } catch (error) {
        console.error("> Erro ao buscar músicas: " + error);
        return res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
    }
}

// Função para buscar músicas utilizando uma API de terceiro
const searchForMusic = async (req, res, message, status) => {

    const { term } = req.body;

    try {
        const response = await getMusicList(term);
        const isEmpty = response.body.every(item => item === undefined || item === null);

        if (isEmpty) {
            return res.status(status ?? 200).render("admin/search_music", {
                musicList: null,
                message: message ?? null
            });
        }
        if (response.success) {
            return res.status(status ?? 200).render("admin/search_music", {
                musicList: response.body,
                message: message ?? null
            });
        }

    } catch (error) {
        console.error("> Erro ao pesquisar músicas: " + error);
        return res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
    }
}

// Função para importar música
const importMusic = async (req, res) => {

    const { id } = req.params;
    const { youtubeUrl } = req.body ?? {};

    try {
        const getByIdResponse = await getMusicById(id);
        const createResult = await musicRepository.createMusic(getByIdResponse.body, youtubeUrl);

        if (createResult.success) {
            return getAllMusic(req, res, createResult.message, 200);
        }
        return searchForMusic(req, res, createResult.message, 400);

    } catch (error) {
        console.error("> Erro ao importar música: " + error);
        return res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
    }
}

// Função para deletar música
const deleteMusic = async (req, res) => {

    const { id } = req.params;

    try {
        const deleteResult = await musicRepository.deleteMusic(id);

        if (deleteResult.success) {
            return getAllMusic(req, res, deleteResult.message, 200);
        }
        return getAllMusic(req, res, deleteResult.message, 400);

    } catch (error) {
        console.error("> Erro ao deletar música: " + error);
        return res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
    }
}

// Função para atualizar música
const updateMusicForm = async (req, res) => {

    const { id } = req.params;

    try {
        const music = await musicRepository.getMusicById(id);
        console.log(music);

        if (music) {
            return res.render("admin/edit_music", {
                music: music.musicIndex
            });
        }
        return res.status(404).json({ message: "Música não encontrada" });

    } catch (error) {
        console.error("> Erro ao buscar música para atualização: " + error);
        return res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
    }
}

const updateMusic = async (req, res) => {

    const { title, author, lyrics, youtubeUrl } = req.body;
    const { id } = req.params;

    try {
        const music = await musicRepository.getMusicById(id);

        if (!music) {
            return res.status(404).json({ success: false, message: "Música não encontrada" });
        }

        const updatedMusic = await musicRepository.updateMusic(id, title, author, lyrics, youtubeUrl);

        if (updatedMusic.success) {
            return getAllMusic(req, res, "Música editada com sucesso", 200)
        }
        return res.status(400).render("admin/edit_music", {
            success: false,
            message: "Campos inválidos",
            music: { id, title, author, lyrics, youtubeUrl }
        });

    } catch (error) {
        console.error("Erro ao atualizar música: " + error);
        return res.status(500).json({ success: false, message: "Erro interno ao atualizar música" });
    }
}

// Exportando as funções
module.exports = {
    handleLogin,
    getAllMusic,
    searchForMusic,
    importMusic,
    deleteMusic,
    updateMusicForm,
    updateMusic,
};