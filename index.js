import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import { serve } from "inngest/express"
import { inngest } from "./inngest/client.js"
import { onUsersignup } from "./inngest/functions/onSignUp.js"
import { onTicketCreate } from "./inngest/functions/onTicketCreate.js"

dotenv.config({ path: './.env' });

const PORT = process.env.PORT || 8000
const app = express()

app.use(cors())
app.use(express.json())

//Routes

import userRoutes from "./routes/user.routes.js"
import ticketRoutes from "./routes/ticket.route.js"

app.use("/api/auth",userRoutes)
app.use("/api/tickets",ticketRoutes)

app.use("/api/inngest", serve({
    client:inngest,
    functions: [onUsersignup, onTicketCreate]
}))

//DB
console.log(process.env.MONGO_URI);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connect");
        app.listen(PORT, () => {
            console.log(`Server is up and running on port ${PORT}`);
            
        })
        
    })
    .catch((error) => {
        console.log("MongoDB error",error);
        
    })