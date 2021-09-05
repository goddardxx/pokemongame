<template>
  <div>
    <h1 v-if="!pokemon">Espera un momento...</h1>
    <div v-else>
      <h1>¿Quien es este pokemon?</h1>
      <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />
      <PokemonOptions
        :pokemons="pokemonsArr"
        @selection-pokemon="checkAnswer"
      />
      <div v-if="showAnswer">
        <h2 class="fade-in">{{ message }}</h2>
        <button @click="newGame">Iniciar otro juego</button>
      </div>
    </div>
  </div>
</template>

<script>
import PokemonPicture from "@/components/PokemonPicture.vue";
import PokemonOptions from "@/components/PokemonOptions.vue";
import getPokemonOptions from "@/helpers/getPokemonOptions.js";

export default {
  name: "PokemonPage",
  data() {
    return {
      pokemonsArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: "",
    };
  },
  components: {
    PokemonPicture,
    PokemonOptions,
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonsArr = await getPokemonOptions();
      const rndInt = Math.floor(Math.random() * 3);
      this.pokemon = this.pokemonsArr[rndInt];
    },
    checkAnswer(pokemonId) {
      this.showPokemon = true;
      this.showAnswer = true;

      if (this.pokemon.id === pokemonId) {
        this.message = `Correcto, ${this.pokemon.name}`;
      } else {
        this.message = `Oops, era ${this.pokemon.name}`;
      }
    },
    newGame() {
      this.pokemonsArr = [];
      this.pokemon = null;
      this.showPokemon = false;
      this.showAnswer = false;
      this.mixPokemonArray();
    },
  },
  mounted() {
    this.mixPokemonArray();
  },
};
</script>