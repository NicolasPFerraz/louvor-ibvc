/**
 * Busca de musicas na api do vagalume
 * @param {string} term termo para busca de musicas
 */


async function getMusicList(term, limit = 0) {
    try {
        const api = `https://lrclib.net/api/search?q=${term}`;
        const response = await fetch(api);
        const body = await response.json(); // Transforma uma string JSON num objeto javascript

        console.log(`> LRCLIB API fetched`);

        if (!response.ok) {
            console.log("> Erro na requisição:", response.status);
            return {
                success: false, 
                message: "Network response was not ok", 
                status: response.status
            }
        }
        return {
            success: true,
            body: body
        }
    } catch (err) {
        // Lida com qualquer erro que possa acontecer durante a requisição
        console.log(err);
        return {
            success: false,
            message: "There was a problem with the fetch operation",
            status: response.status,
            err: err
        }
    }
}

/**
 * Busca musica por id
 * @param {string} id - id zmusica vagalume
 */
async function getMusic(id) {
    const api = `https://api.vagalume.com.br/search.php?&musid=${id}&apikey=${vagalumeKey}`;

    return await fetch(api)
        .then(response => {
            // Check if the request was successful (status code 200)
            console.log(`> Vagalume API fetched`)
            if (!response.ok) {
                console.log("DNS ERROR")
                return { success: false, message: "Network response was not ok", response: response }
            }
            return {
                success: true,
                response
            }
        }).catch((error) => {
            // Handle any errors that occurred during the fetch
            console.log(error)
            return {
                success: false,
                message: "There was a problem with the fetch operation",
                error: error
            }
        });
}

module.exports = {
    getMusicList,
    getMusic
}