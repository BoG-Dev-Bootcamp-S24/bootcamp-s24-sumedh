export default async function handler(req, res) {
    const URL = "https://pokeapi.co/api/v2/pokemon/"
    const name1 = req.body.name1;
    const name2 = req.body.name2;

    if (req.method == "POST") {
        try {
            const response1 = await fetch(URL + name1)
            const response2 = await fetch(URL + name2)
            const pokemon1 = await response1.json();
            const pokemon2 = await response2.json();
            let pokemon1stat = 0
            let pokemon2stat = 0
            pokemon1.stats.forEach((stat) => pokemon1stat += stat.base_stat)
            pokemon2.stats.forEach((stat) => pokemon2stat += stat.base_stat)

            res.status(200).json({ Win : pokemon1stat >= pokemon2stat ? pokemon1.name : pokemon2.name});
        } catch (e) {
            res.status(400).json({ error : "The Names Are Not Pokemon"});
        }
    } else {
        res.status(400).json({ error : "Not a Post Request"});
    }
}