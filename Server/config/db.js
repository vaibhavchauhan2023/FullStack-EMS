import mongoose from "mongoose";


const connectDB = async ()=>{
    try {
        //debug for env file
        // console.log("DEBUG -> URI IS:", process.env.MONGODB_URI);
        mongoose.connection.on('connected', ()=> console.log("Database Connected"))
        await mongoose.connect(process.env.MONGODB_URI)
    } catch (error) {
        console.error("Database connection failed: ", error.message)
    }
}

export default connectDB;