import mongoose from "mongoose";

export default async function connectDB() {

    if (mongoose.connection[0]?.readyState) {
        return;
    }

    await mongoose.connect(process.env.DB_URL, {dbNAME : process.env.DB_NAME}).catch((e) => {
        console.error("Error Connecting", e)
        throw e;
    });



}