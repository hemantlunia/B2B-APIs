import mongoose from "mongoose";


async function connectToDB() {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`mongodb connected on: ${connect.connection.host}`);
        
      } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); 
      }
}

export default connectToDB;
