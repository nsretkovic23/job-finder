import mongoose from "mongoose";

// TODO: This db is now deleted so it doesn't matter, but next time move this to env
const CONNECTION_STRING = "mongodb+srv://nsretkovic:nikolabaze101@jobfinder.eapiyv2.mongodb.net/?retryWrites=true&w=majority";

const dbConnect = async () => {
    if (!mongoose.connection.readyState) {
        try {
            await mongoose.connect(CONNECTION_STRING);
        } catch (error) {
            console.error("Connection to mongodb failed!");
        }
    }
}


export default dbConnect;
