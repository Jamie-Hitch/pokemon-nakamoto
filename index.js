// Variables

let index = 1;

// Helper Functions

const capitalize = (word) => {
    word.style.textTransform = "capitalize"
}

const clearElement = (element) => {
    element.innerHTML = "";
}

const getMovesList = (pokemonData) => {
    const movesList = document.querySelector("#list")
    clearElement(movesList)
    for (let i = 0; i < 5; i++) {
        const listItem = document.createElement("li")
        listItem.textContent = pokemonData.moves[i].move.name
        movesList.appendChild(listItem)
    }
}

const getTitle = (pokemonData) => {
    const pokemonTitle = document.querySelector('#pokemonName')
    capitalize(pokemonTitle)
    pokemonTitle.textContent = pokemonData.name
}

const getFrontImage = (pokemonData) => {
    const pokemonImage = document.querySelector('#pokemonImage')
    pokemonImage.src = pokemonData.sprites.front_default
}

const getBackImage = (pokemonData) => {
    const pokemonImageBack = document.querySelector('#pokemonImageBack')
    pokemonImageBack.src = pokemonData.sprites.back_default
}

const nextPokemon = () => {
    index ++
    fetchPokemon(index)
}

const searchPokemon = (evt) => {
    evt.preventDefault()
    const pokemonSearch = document.getElementById("pokemonSearch")
    fetchPokemon(pokemonSearch.value)
}

// Main Functions

const fetchPokemon = async (pokemonIndex) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`)
        const pokemonData = await response.json()
        getTitle(pokemonData)
        getFrontImage(pokemonData)
        getBackImage(pokemonData)
        getMovesList(pokemonData)
        index = pokemonData.id
    } catch(error) {
        console.log(error)
    }
    
}

const createSubmitEvent = () => {
    const form = document.getElementById("pokemonForm")
    form.addEventListener("submit", searchPokemon)
}

const createClickEvent = () => {
    const pokemonButton = document.getElementById("nextPokemon");
    pokemonButton.addEventListener("click", nextPokemon)
}

// Call Functions

fetchPokemon(index)
createClickEvent()
createSubmitEvent()

