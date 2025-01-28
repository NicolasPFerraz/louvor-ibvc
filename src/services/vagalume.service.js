const vagalumeKey = process.env.VAGALUME_KEY;

/**
 * Busca de musicas na api do vagalume
 * @param {string} term termo para busca de musicas
 * @param {int} limit quantidade de musicas por busca
 */

async function search(term, limit = 0) {

    const api = `https://api.vagalume.com.br/search.excerpt?apikey=${vagalumeKey}&q=${term}&limit=${limit}`;
    
    return await fetch(api)
        .then(response => {
            // Check if the request was successful (status code 200)
            console.log(`> Vagalume API fetched`)
            if (!response.ok) {
                return { success: false, message: "Network response was not ok" }
            }
            return {
                success: true,
                response
            }
        }).catch(error => {
            // Handle any errors that occurred during the fetch
            return { 
                success: false, 
                message: "There was a problem with the fetch operation"
            }
        });
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
            if (!response.ok){ 
                console.log("DNS ERROR")
                return { success: false, message: "Network response was not ok", response: response }
            }
            return {
                success: true,
                response
            }
        }).catch(error => {
            // Handle any errors that occurred during the fetch
            return { 
                success: false, 
                message: "There was a problem with the fetch operation"
            }
        });
}

module.exports = {
    search,
    getMusic
}