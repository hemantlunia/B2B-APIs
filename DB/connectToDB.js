import mongoose from "mongoose";

// App version model
import Version from "../models/appVersion.model.js";


async function connectToDB() {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`mongodb connected on: ${connect.connection.host}`);
        

        // initially updating appVersion
        const existingVersion = await Version.findOne();
        if (!existingVersion) {
          await Version.create({
            version:"2.0.0"
          })
        }
      } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); 
      }
}
 
export default connectToDB;  
