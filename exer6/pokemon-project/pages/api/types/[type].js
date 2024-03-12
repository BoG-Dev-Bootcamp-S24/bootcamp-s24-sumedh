export default async function handler(req, res) {
    const URL = "https://pokeapi.co/api/v2/type/";
    
    if (req.method === "GET") {
        const {type} = req.query;
        try {
            const response = await fetch(URL + type);
            if (!response.ok) {
                return res.status(404).json({ error: "Pokémon not found." });
            }
            const pokemons = await response.json();
            const list = pokemons.pokemon.map(a => (a.pokemon.name)); 
            res.status(200).json({
                names: list
            });

        } catch (e) {
            res.status(400).json({ error: "Could Not Find Pokemon!" });
        }
    }
  }