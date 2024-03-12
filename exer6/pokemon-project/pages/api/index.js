export default async function handler(req, res) {


    async function fetchRandomPokemon() {
        const randomID = Math.floor(Math.random() * 1000) + 1;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomID}`);
        const data = await response.json();
        return data;
      }
    
      try {
        const pokemon = await fetchRandomPokemon();
    
        const { name, sprites, types } = pokemon;
        const sprite = sprites.front_default;
        const pokemonTypes = types.map((typeEntry) => typeEntry.type.name);
 
        res.status(200).json({
          name,
          sprite,
          type: pokemonTypes,
        });
      } catch (error) {

        res.status(500).json({ message: "Error fetching Pokemon Data" });
      }
}