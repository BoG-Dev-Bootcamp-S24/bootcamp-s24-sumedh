export default async function handler(req, res) {
    const URL = "https://pokeapi.co/api/v2/pokemon/";
    
    if (req.method === "GET") {
        const {name} = req.query;
        try {
            const response = await fetch(URL + name);
            if (!response.ok) {
                return res.status(404).json({ error: "Pokémon not found." });
            }
            const pokemon = await response.json();
            const pokemonTypes = pokemon.types.map(a => a.type.name);
            res.status(200).json({
                name: pokemon.name,
                sprite: pokemon.sprites.front_default,
                type: pokemonTypes
            });

        } catch (e) {
            res.status(400).json({ error: "Could Not Find Pokemon!" });
        }
    }
  }