//voy a extraer la lista de pokemon del api mostrando algunos datos

// Con querySelector selecciono el div donde mostraré los datos
const divContenedor = document.querySelector(".divContenedor");
// Creo la función donde almacenaré los datos que voy a extraer.
const obtenerPokemon = async () => {
  // Le meto un try-catch por si falla que me avise.
  try {
    // creo una variable para que me almacene los datos extraidos del bucle
    const datosPokemon = [];
    // creo un bucle para que me vuelque los datos a la variable direccion.
    for (let index = 1; index < 151; index++) {
      const direccion = `https://pokeapi.co/api/v2/pokemon/${index}`;
      // hago fetch a la variable direccion.
      const respuesta = await fetch(direccion);
      const result = await respuesta.json();
      // Mapeo la información extrayendo los datos que quiero.
      const pokemon = {
        name: result.name,
        image: result.sprites["front_default"],
        type: result.types.map((type) => type.type.name).join(", "),
        abilities: result.abilities.map((ability) => ability.ability.name).join(", "),
        id: result.id,
      };
      //añado la informacion a la variable datosPokemon
      datosPokemon.push(pokemon);
    }
    return datosPokemon;
  } catch (error) {
    console.log(error);
  }
};
// pinto los datos en el html.
const pintar = (datosPokemon) => {
  divContenedor.innerHTML = datosPokemon
    .map(
      (result) => `
            <div class= "divCarta">
            <div class= "divDelantero">
            <img class="carta" src="${
                                     result.type.includes('fire') ? './img/fire.png' :
                                     result.type.includes('normal') ? './img/normal.png' :
                                     result.type.includes('fairy') ? './img/fairy.png' :
                                     result.type.includes('electric') ? './img/electric.png' :
                                     result.type.includes('dragon') ? './img/dragon.png' :
                                     result.type.includes('water') || result.type.includes('ice') ? './img/water.png' :
                                     result.type.includes('grass') || result.type.includes('bug') ? './img/grass.png':
                                     result.type.includes('poison') || result.type.includes('psychic') ? './img/psychic.png' : 
                                     result.type.includes('fighting') || result.type.includes('ground') || result.type.includes('rock')? './img/fighting.png' :
                                     './img/normal.png'}">
            <div class= "datosCarta">
            <div class= "divId">
            <h2 class= "textoId">${result.id}</h2>
            </div>
            <div class= "divImagenCarta">
            <img class= "imagenCarta" src="${result.image}"/>
            </div>
            <div class= "divNombre">
            <h2 class= "textoNombre">${result.name}</h2>
            </div> 
            <div class= "divTipo"><p class="textoTipo">Tipo: ${result.type}</p>
            </div>
            <div class="divHabilidades">
            <h2 class="textoHabilidades">Habilidades: <br>${result.abilities}</h2>
            </div>
            </div>
            </div>
            <div class= "divTrasero">
            <img class="carta" src="./img/carta2.png">
            </div>
            </div>
  `
    )
    .join("");
};


// Voy a crear un filtro para filtrar por texto.

// creo una funcion que recupere los datos de los pokemon
const cogerInput = (datosPokemon) => {
  // selecciono el input de mi html
  const input$$ = document.querySelector("input");
  // añado un escuchador de eventos que escuche lo que se escriba dentro del input
  input$$.addEventListener("input", () =>
    busqueda(input$$.value, datosPokemon)
  );
};
// creo una funcion para que reciba los datos del valor del input
const busqueda = (filtro, datosPokemon) => {
  // con la funcion filter creo una nueva caraiable con los datos que contienen el texto filtrado
  let pokemonFiltrados = datosPokemon.filter((result) =>
    result.name.toLowerCase().includes(filtro)
  );
  pintar(pokemonFiltrados);
};
// creo la funcion init que llama a las funciones necesarias para iniciar el filtrado
const init = async () => {
  const datosPokemon = await obtenerPokemon();
  pintar(datosPokemon);
  cogerInput(datosPokemon);
};
//llamo a la funcion init
init();
