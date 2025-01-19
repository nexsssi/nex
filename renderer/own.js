document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchPopup = document.getElementById('search-popup');
    const searchHistory = document.getElementById('search-history');
    const searchSuggestions = document.getElementById('search-suggestions');
    let searchTerms = [];

    const suggestions = ['github', 'gitlab', 'git', 'git it']; // Add more suggestions as needed

    searchInput.addEventListener('focus', function() {
        searchPopup.classList.remove('hidden');
        showSearchHistory();
    });

    searchInput.addEventListener('click', function() {
        searchPopup.classList.remove('hidden');
        showSearchHistory();
    });

    searchInput.addEventListener('blur', function() {
        setTimeout(() => {
            searchPopup.classList.add('hidden');
        }, 200);
    });

    searchInput.addEventListener('input', function() {
        const term = this.value.trim().toLowerCase();
        if (term) {
            showSuggestions(term);
        } else {
            showSearchHistory();
        }
    });

    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const term = this.value.trim();
            if (term) {
                addSearchTerm(term);
                this.value = ''; // Clear the input after adding to history
                showSearchHistory();
            }
        }
    });

    function addSearchTerm(term) {
        const index = searchTerms.indexOf(term);
        if (index > -1) {
            searchTerms.splice(index, 1);
        }
        searchTerms.unshift(term);
        if (searchTerms.length > 5) {
            searchTerms.pop();
        }
        updateSearchHistory();
    }

    function updateSearchHistory() {
        const ul = searchHistory.querySelector('ul');
        ul.innerHTML = '';
        searchTerms.forEach(term => {
            const li = createListItem(term, 'history');
            ul.appendChild(li);
        });

        if (searchTerms.length === 0) {
            const emptyState = createEmptyState();
            ul.appendChild(emptyState);
        }
    }

    function showSuggestions(term) {
        const filteredSuggestions = suggestions.filter(suggestion => 
            suggestion.toLowerCase().startsWith(term)
        );
        
        const ul = searchSuggestions.querySelector('ul');
        ul.innerHTML = '';
        filteredSuggestions.forEach(suggestion => {
            const li = createListItem(suggestion, 'suggestion');
            ul.appendChild(li);
        });

        searchHistory.classList.add('hidden');
        searchSuggestions.classList.remove('hidden');
    }

    function showSearchHistory() {
        searchHistory.classList.remove('hidden');
        searchSuggestions.classList.add('hidden');
    }

    function createListItem(text, type) {
        const li = document.createElement('li');
        li.className = 'px-1 py-1.5 rounded-md hover:bg-gray-100 cursor-pointer text-sm flex items-center';
        const truncatedText = text.length > 25 ? text.substring(0, 22) + '...' : text;
        let iconSvg;
        if (type === 'history') {
            iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" class="mr-1 flex-shrink-0" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                <path d="M136,80v43.47l36.12,21.67a8,8,0,0,1-8.24,13.72l-40-24A8,8,0,0,1,120,128V80a8,8,0,0,1,16,0Zm-8-48A95.44,95.44,0,0,0,60.08,60.15C52.81,67.51,46.35,74.59,40,82V64a8,8,0,0,0-16,0v40a8,8,0,0,0,8,8H72a8,8,0,0,0,0-16H49c7.15-8.42,14.27-16.35,22.39-24.57a80,80,0,1,1,1.66,114.75,8,8,0,1,0-11,11.64A96,96,0,1,0,128,32Z"></path>
            </svg>`;
        } else {
            iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" class="mr-1 flex-shrink-0" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
            </svg>`;
        }
        li.innerHTML = `
            ${iconSvg}
            <span class="truncate">${truncatedText}</span>
        `;
        li.addEventListener('click', function() {
            searchInput.value = text;
            searchInput.focus();
        });
        return li;
    }

    function createEmptyState() {
        const emptyState = document.createElement('div');
        emptyState.className = 'h-24 mb-1 flex flex-col text-gray-500 items-center justify-center';
        emptyState.innerHTML = `
            <h3 class="text-xs font-semibold mb-2">No search history found</h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                <path d="M198.24,62.63l15.68-17.25a8,8,0,0,0-11.84-10.76L186.4,51.86A95.95,95.95,0,0,0,57.76,193.37L42.08,210.62a8,8,0,1,0,11.84,10.76L69.6,204.14A95.95,95.95,0,0,0,198.24,62.63ZM48,128A80,80,0,0,1,175.6,63.75l-107,117.73A79.63,79.63,0,0,1,48,128Zm80,80a79.55,79.55,0,0,1-47.6-15.75l107-117.73A79.95,79.95,0,0,1,128,208Z"></path>
            </svg>
        `;
        return emptyState;
    }

    // Initial update
    updateSearchHistory();

});


document.addEventListener('DOMContentLoaded', () => {
    const iconButtons = document.querySelectorAll('.icon-btn');
    
    iconButtons.forEach(button => {
        button.addEventListener('click', () => {
            iconButtons.forEach(btn => btn.classList.remove('bg-stone-100', 'border-slate-300', 'shadow-sm'));
            button.classList.add('bg-stone-100', 'border-slate-300', 'shadow-sm');
        });
    });


});




