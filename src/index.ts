import dotenv from "dotenv";
import env from "./config/environment";
import app from "./app";


dotenv.config({ path: `.env.${env.NODE_ENV}` });


app.listen(process.env.PORT,()=>{
    console.log("Server is running on port",process.env.PORT);
})

