/**
 * Busca de musicas na api lrclib
 * @param {string} term termo para busca de musicas
 */

async function getMusicList(term, limit = 0) {

    const api = `https://lrclib.net/api/search?q=${term}`;

    try {
        const response = await fetch(api);
        console.log(`> LRCLIB API fetched`);

        if (!response.ok) {
            throw new Error(`Resposta não OK - Status: ${response.status}`);
        }

        const body = await response.json(); // Transforma a resposta JSON em um objeto JavaScript

        return {
            success: true,
            body: body
        };

    } catch (error) {
        // Lida com qualquer erro que possa acontecer durante a requisição
        console.error(`> Erro ao realizar requisição na API:
            URL: ${api}
            Erro: ${error.message || error}
            Stack Trace: ${error.stack || 'Sem stack trace disponível'}`);
        return { success: false, error: "Erro interno no servidor" };
    }
}

/**
 * Busca musica por id
 * @param {string} id - id zmusica vagalume
 */
async function getMusicById(id) {

    const api = `https://lrclib.net/api/get/${id}`;

    try {
        const response = await fetch(api);
        console.log(`> LRCLIB API fetched`);

        if (!response.ok) {
            throw new Error(`Resposta não OK - Status: ${response.status}`);
        }

        const body = await response.json(); // Transforma uma string JSON num objeto javascript

        return {
            success: true,
            body: body
        }

    } catch (error) {
        // Lida com qualquer erro que possa acontecer durante a requisição
        console.error(`> Erro ao realizar requisição na API:
            URL: ${api}
            Erro: ${error.message || error}
            Stack Trace: ${error.stack || 'Sem stack trace disponível'}`);
        return { success: false, error: "Erro interno no servidor" };
    }
}

module.exports = {
    getMusicList,
    getMusicById
}