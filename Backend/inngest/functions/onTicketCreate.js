import { inngest } from "../client.js";
import { NonRetriableError } from "inngest";
import sendMail from "../../utils/mailer.js";
import { Ticket } from "../../models/ticket.model.js";
import analyzeTicket from "../../utils/ai.js";
import { User } from "../../models/user.model.js";

export const onTicketCreate = inngest.createFunction(
  { id: "on-ticket-created", retries: 2 },
  { event: "ticket/created" },

  async ({ event, step }) => {
    try {
      const ticketId = event.data.ticketId;
      console.log("event-data: ", event.data);

      const ticket = await step.run("fetch-ticket", async () => {
        const ticketObject = await Ticket.findById(ticketId);

        if (!ticketObject) {
          throw new NonRetriableError("Ticket not found");
        }

        return ticketObject;
      });

      await step.run("update-ticket-status", async () => {
        await Ticket.findByIdAndUpdate(ticket._id, {
          status: "TODO",
        });
      });

      const aiResponse = await analyzeTicket(ticket);

      const relatedSkills = await step.run("ai-processing", async () => {
        let skills = [];

        if (aiResponse) {
          await Ticket.findByIdAndUpdate(ticket._id, {
            priority: !["low", "medium", "high"].includes(aiResponse.priority)
              ? "medium"
              : aiResponse.priority,
            helpfulNotes: aiResponse.helpfulNotes,
            relatedSkills: aiResponse.relatedSkills,
          });

          skills = aiResponse.relatedSkills;
          return skills;
        }
        return [];
      });

       console.log(aiResponse)

      const moderator = await step.run("assign-moderator", async () => {
        let user = await User.findOne({
          role: "moderator",
          skills: {
            $elemMatch: {
              $regex: relatedSkills.join("|") || ".*",
              $options: "i",
            },
          },
        });

        if (!user) {
          user = await User.findOne({
            role: "admin",
          });
        }

        await Ticket.findByIdAndUpdate(ticket._id, {
          assignTo: user._id,
        });
        return user;
      });

      await step.run("send-email-notification", async () => {
        if (moderator) {
          const finalTicket = await Ticket.findById(ticket._id);

          await sendMail(
            moderator.email,
            "Ticket Assigned",
            `A new tickrt is assign to you ${finalTicket.title}`
          );
        }
      });

      return { success: true };
    } catch (error) {
      console.log("error running the step create", error.message);

      return { success: false };
    }
  }
);
