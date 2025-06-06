import { inngest } from "../inngest/client.js";
import { Ticket } from "../models/ticket.model.js";

export const createTicket = async (req, res) => {
    try {
        const { title, description } = req.body
        console.log(req.body);
        console.log(req.user);
        

        if (!title || !description) {
            return res.status(400).json({message : "Title and Description are requried"})
        }

        const newTicket = await Ticket.create({
            title,
            description,
            createdBy: req.user._id.toString()
        })

        console.log(newTicket);
        

        await inngest.send({
            name:"ticket/created",
            data:{
                ticketId: newTicket._id,
                // title,
                // description,
                // createdBy: req.user._id
            }
        })

        return res.status(200).json(
            {
                message: "Ticket created and processing started",
                Ticket: newTicket
            }
        )
    } catch (error) {
        console.log("error creating ticket", error.message);

        return res.status(500).json({message: "Internal server error"})   
    }
}

export const getTickets = async (req, res) => {

    try {
        const user = req.user
        let tickets = []

        if(user.role !== "user"){
            tickets = await Ticket.find({})
                            .populate("assignedTo", ["email", "_id"])
                            .sort({createdAt: -1})
        }else{
            tickets = await Ticket.find({createdBy: user._id})
                            .select("title description status createdAt")
                            .sort({createdAt: -1})
        }

        return res.status(200).json({message: "tickets fetched",tickets})
    } catch (error) {
        console.log("error fetching tickets", error.message);

        return res.status(500).json({message: "Internal server error"}) 
    }
}

export const getTicket = async (req,res) => {

    try {
        const user = req.user
        let ticket
        if (user.role !== "user") {
            ticket = await Ticket.findById(req.params.id)
                            .populate("assignedTo", ["email", "_id"])
        }else{
            ticket = await Ticket.findOne({
                createdBy: user._id,
                _id: req.params.id
            }).select("title description status createdAt")
        }

        if(!ticket){
            return res.status(404).json({message:"Ticket not found"})
        }

        return res.status(200).json({message: "Ticket fetched",ticket})
    } catch (error) {
        console.log("error fetching ticket", error.message);

        return res.status(500).json({message: "Internal server error"}) 
    }
}