document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const musicItems = document.querySelectorAll('.song-item');
    const sections = document.querySelectorAll('.letter');
    const musicSection = document.querySelectorAll('#music');
    const noResultsMessage = document.getElementById('no-results-message');

    // Função para normalizar a string (remove acentos e vírgulas)
    function normalizeString(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[,]/g, '');
    }

    // Armazena os títulos normalizados em data attributes para melhorar a performance da pesquisa
    musicItems.forEach(function(item) {
        const title = item.querySelector('a').textContent.toLowerCase();
        const normalizedTitle = normalizeString(title);
        item.dataset.title = normalizedTitle;
    });

    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    function filterSongs() {
        const filter = normalizeString(searchInput.value.toLowerCase());
        let visibleItemCount = 0;

        musicItems.forEach(function(item) {
            if (item.dataset.title.includes(filter)) {
                item.style.display = '';
                visibleItemCount++;
            } else {
                item.style.display = 'none';
            }
        });

        sections.forEach(function(section) {
            const visibleItems = section.querySelectorAll('.song-item:not([style*="display: none"])');
            if (visibleItems.length === 0) {
                section.style.display = 'none';
            } else {
                section.style.display = '';
            }
        });

        // Exibir a mensagem "No results found" se nenhum item estiver visível
        if (visibleItemCount === 0) {
            noResultsMessage.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'none';
        }
    }

    const debouncedFilterSongs = debounce(filterSongs, 200);
    searchInput.addEventListener('input', debouncedFilterSongs);

    // Inicializar a mensagem de "No results found" oculta
    noResultsMessage.style.display = 'none';
});