const Music = require("../models/Music");

// Função para criar um novo registro de música
const convertWatchToEmbedUrl = (watchUrl) => {
	// Usa uma expressão regular para capturar o ID do vídeo
	const videoIdMatch = watchUrl.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/);

	if (videoIdMatch && videoIdMatch[1]) {
		const videoId = videoIdMatch[1];
		return `https://www.youtube.com/embed/${videoId}`;
	} else {
		// Retorna null se a URL não estiver no formato esperado
		return null;
	}
}

const convertSlashToDash = (name) => { return name.replace('/', '-') }

const createMusic = async (responseData, youtubeUrl) => {

	const { name, artistName, plainLyrics } = responseData;
	const formatedName = convertSlashToDash(name);

	if (youtubeUrl) {
		var embedUrl = convertWatchToEmbedUrl(youtubeUrl);

		if (!embedUrl) {
			throw {
				status: 400,
				message: "Erro ao cadastrar música: link do youtube inválido"
			};
		}
	}

	return await Music.create({ title: formatedName, author: artistName, lyrics: plainLyrics, youtube_link: embedUrl ?? '' })
		.then((result) => {
			return {
				status: 201,
				success: true,
				message: "Música cadastrada com sucesso",
				music: result
			}
		})
		.catch(err =>{
			throw new Error(err)
		})
};

// Função para recuperar todos os registros de música
const getAllMusic = async () => {
	try {
		const music = await Music.findAll({
			attributes: ['title', 'author', 'id'], // Seleciona apenas a coluna 'title', 'author' e 'id'
			order: [
				['title', 'ASC'] // ASC para ordenação ascendente, DESC para ordenação descendente
			],
			raw: true,
		});
		return {
			status: 200,
			success: true,
			musicIndex: music
		}
	} catch (error) {
		return {
			status: 500,
			success: false,
			message: "Erro ao recuperar registros de música",
			error: error
		}
	}
};

// Função para recuperar um registro de música por ID
const getMusicById = async (id) => {
	try {
		const music = await Music.findByPk(id);
		if (!music) {
			return {
				status: 404,
				success: false,
				message: "Registro de música não encontrado"
			}
		}
		return {
			status: 200,
			success: true,
			musicIndex: music
		}
	} catch (error) {
		return {
			status: 500,
			success: false,
			message: "Erro ao recuperar registro de música",
			error: error
		}
	}
};

// Função para recuperar um registro de música por título
const getMusicByTitle = async (title) => {
	try {
		const music = await Music.findOne({ where: { title: title } });
		if (!music) {
			return {
				status: 404,
				success: false,
				message: "Registro de música não encontrado"
			}
		}
		return {
			status: 200,
			success: true,
			music: music
		}
	} catch (error) {
		return {
			status: 500,
			success: false,
			message: "Erro ao recuperar registro de música",
			error: error
		}
	}
};

// Função para atualizar um registro de música
const updateMusic = async (id, title, author, lyrics) => {
	try {
		const music = await getMusicById(id);
		if (!music) {
			return {
				status: 404,
				success: false,
				message: "Registro de música não encontrado"
			}
		}
		await Music.update({ title, author, lyrics }, { where: { id } });
		return {
			status: 200,
			success: true,
			musicIndex: music
		}
	} catch (error) {
		return {
			status: 500,
			success: false,
			message: "Erro ao atualizar música",
			error: error
		}
	}
};

// Função para deletar um registro de música
const deleteMusic = async (id) => {
	try {
		const music = await getMusicById(id);
		if (!music) {
			return {
				status: 404,
				success: false,
				message: "Registro de música não encontrado"
			}
		}
		await Music.destroy({ where: { id } });
		return {
			status: 200,
			success: true,
			musicIndex: music
		}
	} catch (error) {
		console.log(error)
		return {
			status: 500,
			success: false,
			message: "Erro ao deletar registro de música",
			error: error
		}
	}
};

module.exports = {
	createMusic,
	getAllMusic,
	getMusicById,
	getMusicByTitle,
	updateMusic,
	deleteMusic,
};