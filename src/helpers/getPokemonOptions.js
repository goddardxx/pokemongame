import pokemonApi from "@/api/pokemonApi.js";

function getPokemons() {
  const pokemonsArr = Array(650).fill(undefined);
  return pokemonsArr.map((_, index) => index + 1);
}

async function getPokemonOptions() {
  const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5);
  const pokemonsInfo = await getPokemonNames(mixedPokemons.splice(0, 4));

  return pokemonsInfo;
}

async function getPokemonNames([a, b, c, d]) {
  const pokemonsPromises = [
    pokemonApi.get(`/${a}`),
    pokemonApi.get(`/${b}`),
    pokemonApi.get(`/${c}`),
    pokemonApi.get(`/${d}`)
  ];

  const [p1, p2, p3, p4] = await Promise.all(pokemonsPromises);

  return [
    { id: p1.data.id, name: p1.data.name },
    { id: p2.data.id, name: p2.data.name },
    { id: p3.data.id, name: p3.data.name },
    { id: p4.data.id, name: p4.data.name }
  ];
}

export default getPokemonOptions;
