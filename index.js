import express from "express"
import mongose from "mongose"
import cors from "cors"

const PORT = process.env.PORT || 8000
const app = express()

app.use(cors())
app.use(express.json())

mongose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB connect");
        app.listen(prototype, () => {
            console.log(`Server is up and running on port ${PORT}`);
            
        })
        
    })
    .catch((error) => {
        console.log("MongoDB error",error);
        
    })