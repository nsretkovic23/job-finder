import mongoose from "mongoose";

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