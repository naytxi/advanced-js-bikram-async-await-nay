//DESARROLLA AQUI TUS SOLUCIONES


// Ejercicio 1.- Declara una función getRandomPokemon que retorne un pokemon aleatorio.

// Ejercicio 2.- Declara una funcion getImageAndName que retorne el nombre y la URL de la imagen de un pokemon => (return {img, name})

// Ejercicio 3.- Declara una funcion printImageAndName que retorne el string necesario para pintar la imagen y el nombre del pokemon en el DOM de la siguiente forma:

// <section>
//     <img src="url de imagen" alt="nombre del pokemon">
//     <h1>Nombre del pokemon</h1>
// </section>

async function getRandomPokemon() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.results.length);
    const pokemonUrl = data.results[randomIndex].url;
    const pokemonResponse = await fetch(pokemonUrl);
    const pokemonData = await pokemonResponse.json();
    return pokemonData;
  }


  async function getImageAndName(pokemon) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (!response.ok) {
        throw new Error(`Pokémon "${pokemon}" no encontrado`);
      }
    const data = await response.json();
    return {
      name: data.name,
      img: data.sprites.front_default,
    };
  }


  async function printImageAndName(pokemon) {
    try {
    const { name, img } = await getImageAndName(pokemon);
    const html = `
      <section>
        <img src="${img}" alt="${name}" />
        <h1>${name}</h1>
      </section>
    `;
    return html.trim();
  }
    catch (error) {
    console.error(error.message);
    return `<p>Error: ${error.message}</p>`;
  }
}

// Recordatorio, la API de perritos era 'https://dog.ceo/dog-api/'

// Ejercicio 4.- Declara una función getRandomDogImage que retorne la url de la imagen de un perro aleatorio

// Ejercicio 5.- Declara una función getRandomPokemonImage que retorne la url de la imagen de un pokemon aleatorio.

// Ejercicio 6.- Declara una función printPugVsPikachu que pinte la batalla entre "Pug" y "Pikachu" (no se testea)

async function getRandomDogImage() {
    let response = await fetch('https://dog.ceo/api/breeds/image/random');
    let data = await response.json();
    return data.message;
}

async function getRandomPokemonImage() {    
    let pokemon = await getRandomPokemon();
    let {img} = await getImageAndName(pokemon);
    return img;
}

async function printPugVsPikachu() {
    let pugImage = await getRandomDogImage();
    let pikachuImage = await getRandomPokemonImage();
    let section = document.createElement('section');
    let pugImg = document.createElement('img');
    pugImg.src = pugImage;
    pugImg.alt = 'Pug';
    let pikachuImg = document.createElement('img');
    pikachuImg.src = pikachuImage;
    pikachuImg.alt = 'Pikachu';
    section.appendChild(pugImg);
    section.appendChild(pikachuImg);
    document.body.appendChild(section);
}

// Usando la api de Rick and Morty https://rickandmortyapi.com/ y sólo async/await:

// Ejercicio 7.- Declara una función getRandomCharacter que retorne un personaje aleatorio.

// Ejercicio 8.- Declara una función getRandomCharacterInfo que retorne de un personaje su imagen, nombre, episodios en los que aparece y el nombre del primer episodio en el que aparece + fecha de estreno, tendrás que hacer otro fetch para llegar a los ultimos datos. Formato de retorno => (return {img, name, episodes, firstEpisode, dateEpisode})

// Ejercicio 9.- Pinta los anteriores datos en el DOM (no se testea)


async function getRandomCharacter() {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.results.length);
    const characterUrl = data.results[randomIndex].url;
    const characterResponse = await fetch(characterUrl);
    const characterData = await characterResponse.json();
    return characterData;
  }

async function getRandomCharacterInfo() {
    const character = await getRandomCharacter();
    const { id, name, image, episode } = character;
    const firstEpisodeUrl = episode[0];
    const firstEpisodeResponse = await fetch(firstEpisodeUrl);
    const firstEpisodeData = await firstEpisodeResponse.json();
    return {
      img: image,
      name: name,
      episodes: episode.length,
      firstEpisode: firstEpisodeData.name,
      dateEpisode: firstEpisodeData.air_date,
    };
  }


