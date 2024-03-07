const pokemondata = {}

export default async function handler(req, res) {
    const name = req.query.name;
    const url = "https://pokeapi.co/api/v2/pokemon/";

    if (req.method === 'GET') {
        if (!name) {
            res.status(400).json({error : "no name given"});
        }
        if (name) {
            const callURL = url + name;
            const response = await fetch(callURL);
            const data = await response.json();
            res.status(200).json(data);
        } else {
            const data = pokemondata[name];
            res.status(200).json(data);
        }
    }  else if (req.method === 'POST') {
        const data = req.query.data;
        pokemondata[name] = data;
        res.status(200).json({ name });
    }
}
