export default async function handler(req, res) {
    const URL = "https://pokeapi.co/api/v2/pokemon-species/";
    
    if (req.method === "GET") {
        const {name} = req.query;
        const response = await fetch(URL + name);
        try {
            const firstPokemon = await response.json();
            const nextLink = firstPokemon.evolution_chain.url;
            const nextPokemon = await fetch(nextLink);
            const nextName = await nextPokemon.json();
            const evolutionName = nextName.chain.evolves_to;
            res.status(200).json({ evolution_step: evolutionName.length === 0 ? nextName.chain.species.name : evolutionName[0].species.name });

        } catch (e) {
            res.status(400).json({ error: "Can Not Find Evolution For Pokemon" });
        }
    }
  }