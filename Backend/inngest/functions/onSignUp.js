import { inngest } from "../client.js"
import { User } from "../../models/user.model.js"
import { NonRetriableError } from "inngest"
import sendMail from "../../utils/mailer.js"

export const onUsersignup = inngest.createFunction(
    {id: "on-user-signup", retries: 2},
    {event: "user/signup"},


    async ({event, step}) => {
        try {
            const { email } = event.data
            const user = await step.run("get-user-email",async () => {
                const userObject = await User.findOne({email})
                if(!userObject){
                    throw new NonRetriableError("User no longer exist in database")
                }
                return userObject
            })

            await step.run("send-welcome-email",async () => {
                const subject = `Welcome to the app`
                const message = `Hey,
                \n\n
                Thanks for signup. We're glad to have you onboard!
                `

                await sendMail(user.email, subject, message)
            })

            return {
                success: true
            }
        } catch (error) {
            console.log("Error running steps",error.message);
            
        }
    }
)