const searchInput = document.getElementById('search-input');
const pokemonName = document.getElementById('pokemon-name');
const pokemonID = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const spriteContainer = document.getElementById('sprite-container');
const searchForm = document.getElementById('search-form');
const resultsContainer = document.querySelector('.results-container');

searchForm.addEventListener('submit', event => {
    event.preventDefault();
    getPokemon(searchInput.value.trim().toLowerCase());
});

const getPokemon = async (nameOrId) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
        if (!response.ok) throw new Error('Pokémon not found');

        const data = await response.json();
        displayPokemon(data);
    } catch (error) {
        alert('Pokémon not found');
        console.error(error);
        resetDisplay();
    }
};

const displayPokemon = (data) => {
    resultsContainer.style.display = 'block';
    pokemonName.textContent = data.name.toUpperCase();
    pokemonID.textContent = `#${data.id}`;
    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;

    spriteContainer.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name} sprite">`;

    types.innerHTML = data.types
        .map(typeInfo => `<span class="type ${typeInfo.type.name}">${typeInfo.type.name}</span>`)
        .join('');

    hp.textContent = data.stats[0].base_stat;
    attack.textContent = data.stats[1].base_stat;
    defense.textContent = data.stats[2].base_stat;
    specialAttack.textContent = data.stats[3].base_stat;
    specialDefense.textContent = data.stats[4].base_stat;
    speed.textContent = data.stats[5].base_stat;
};

const resetDisplay = () => {
    pokemonName.textContent = '';
    pokemonID.textContent = '';
    weight.textContent = '';
    height.textContent = '';
    types.innerHTML = '';
    spriteContainer.innerHTML = '';
    hp.textContent = '';
    attack.textContent = '';
    defense.textContent = '';
    specialAttack.textContent = '';
    specialDefense.textContent = '';
    speed.textContent = '';
};
