const search = document.getElementById('search');
const matchList = document.getElementById('match-list');



// Search States.json and filter it
const searchStates = async searchText => {
    const res = await fetch('../data/states.json');
    const states = await res.json();

    //Get matches to correct text input 
    let matches = states.filter(states =>{
        const regex  = new RegExp(`^${searchText}`, `gi`);
        return states.name.match(regex) || states.abbr.match(regex);
    });

    if(searchText.length === 0){
        matches = [];
    }

    outputHtml(matches);
};

//Show results in HTML
const outputHtml = matches =>{
    if(matches.length > 0){
        const html = matches.map(match => `
            <div class = card>
            <h4> ${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span> </h4>

            <small>Lat: ${match.lat} / Long: ${match.long} </small>
            </div>
        `).join('');

        matchList.innerHTML = html;
    }
};

search.addEventListener('keyup', () => searchStates(search.value));