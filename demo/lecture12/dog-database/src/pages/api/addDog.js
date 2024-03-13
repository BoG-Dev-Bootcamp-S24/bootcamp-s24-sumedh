
import createDog from "../../../server/mongodb/actions/createDog"


export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            await createDog(req.body);
            return res.status(200).send("Made Dog Successfully")
        } catch (e) {
            return res.status(500).send("Error making the dog")
        }

    } else {
        res,status(405).send("Not POST")
    }

}