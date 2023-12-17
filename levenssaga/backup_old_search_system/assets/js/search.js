function convertToLunrIndex(data) {
    // setup the index for lunar to use, based on raw data
    // (saving this as a file leads to 4MB files, which isn't nice to load)
    const idx = lunr(function () {
        this.ref('id')
        this.field('chapter', { boost: 10 })
        this.field('story', { boost: 10 })
        this.field('cycle')
        this.field('genre', { boost: 5 })
        this.field('content', { boost: 20 })
        this.field('timeperiod')
        this.field('firstline')

        for (const key in data) {
            const item = data[key];
            this.add({
                id: key,
                chapter: item.chapter,
                story: item.story,
                content: item.content,
                timeperiod: item.timeperiod,
                cycle: item.cycle,
                genre: item.genre,
                firstline: item.firstline
            })
        }
    });

    window.searchIndex = idx;
}

function displayResults (query, results, rawIndex) 
{
    const searchResultsContainer = document.getElementById('results')
    const weHaveResults = (results.length > 0)

    searchResultsContainer.innerHTML = '';

    if(!weHaveResults) { 
        let p = document.createElement('p');
        p.innerHTML = 'Sorry, we konden niks vinden!';
        searchResultsContainer.appendChild(p);
        return; 
    }

    console.log("RESULTS")
    console.log(results)

    const scoreOfBestResult = results[0].score;
    const MIN_SEARCH_SCORE = scoreOfBestResult/10.0;

    const MAX_RESULTS = 30;
    const MAX_SEARCH_TERMS = 6;
    
    for (const n in results) {
        const score = results[n].score;
        if(score < MIN_SEARCH_SCORE) { break; }
        if(parseInt(n) >= MAX_RESULTS) { break; }

        const url = results[n].ref; // reference/ID in index IS the URL
        const item = rawIndex[url];

        let a = displaySummary(item, url, searchResultsContainer);

        let searchTermsFound = Object.keys(results[n].matchData.metadata);
        searchTermsFound = searchTermsFound.slice(0, Math.min(searchTermsFound.length, MAX_SEARCH_TERMS));

        a.href += "#:~:text=" + searchTermsFound[0];

        let readableScore = "sterk";
        if(score <= 15.0) { readableScore = "gemiddeld" }
        if(score <= 8.0) { readableScore = "zwak" }

        let searchData = document.createElement('p');
        searchData.innerHTML = 'Overeenkomst: <strong>' + readableScore + '</strong> &middot; Gevonden zoektermen: <strong>' + searchTermsFound.join(", ") + '</strong>';
        searchData.classList.add("summary-search-data");
        a.appendChild(searchData);
    }
    updateProgressOnSummaries(); // because the first and only fire of that function will have happened a long time ago
}

function checkSearchQuery(rawIndex, searchIndex)
{
    // Get the query parameter(s)
    const params = new URLSearchParams(window.location.search)
    const query = params.get('query')
    const searchRequested = (query != undefined && query != null)

    if(!searchRequested) { return; }

    // (QOL: retain the search input in the form when displaying results)
    document.getElementById('zoekopdracht-input').setAttribute('value', query)

    // perform, save, display the search
    const results = searchIndex.search(query);
    displayResults(query, results, rawIndex)
}
  
  