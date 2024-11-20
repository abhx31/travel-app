import { Request, Response } from "express";
import { AuthenticatedRequest } from "../utils/types";
import { MemberRole, PrismaClient } from "@prisma/client"
import { json } from "stream/consumers";


const prisma = new PrismaClient();


export const joinTrip = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const user = req.user;
        const { id } = req.body;

        if (!user?.id) {
            return res.status(400).json({ message: "User ID is missing or invalid" });
        }

        // Check if the trip exists
        const existingTrip = await prisma.trip.findUnique({
            where: { id },
        });

        if (!existingTrip) {
            return res.status(404).json({ message: "Trip does not exist" });
        }

        const userInTrip = await prisma.tripMember.findFirst({
            where: {
                tripId: existingTrip.id,
                userId: user.id,
            },
        });

        if (userInTrip) {
            return res.status(400).json({ message: "User is already a member of this trip" });
        }

        // Add the user to the trip
        await prisma.tripMember.create({
            data: {
                tripId: existingTrip.id,
                userId: user.id,
                role: MemberRole.MEMBER,
            },
        });

        return res.status(200).json({ message: "Successfully joined the trip" });
    } catch (err) {
        console.error("Error in joinTrip:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const getTrip = async (req: Request, res: Response) =>{
    try {
        const { id } = req.body;
        const trip = await prisma.trip.findFirst({
            where: {
                id
            }
        })

        return res.status(200).json({
            message: 'trip retrieved successfully!',
            trip
        })
    }
    catch(err) {
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const voteForDestination = async (req: AuthenticatedRequest, res: Response) =>{
    try {
        const userId = req.user?.id;
        const { destinationId } = req.body;

        if(!userId) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        const destination = await prisma.destination.findFirst({
            where: {
                id: destinationId
            }
        })

        if(!destination) {
            return res.status(404).json({
                message: "Destination not found"
            })
        }

        const incrementVote = await prisma.destination.update({
            where: {
                id: destinationId
            },
            data: {
                voteCount: {
                    increment: 1
                }
            }
        })

        return res.status(201).json({
            message: "Incremented Successfully",
            incrementVote
        })
    }
    catch(err) {
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const voteForAccommodation = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        const { accommodationId } = req.body;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!accommodationId) {
            return res.status(400).json({ message: "Accommodation ID is required" });
        }

        const accommodation = await prisma.accommodation.findFirst({
            where: { id: accommodationId },
        });

        if (!accommodation) {
            return res.status(404).json({ message: "Accommodation not found" });
        }

        const incrementCount = await prisma.accommodation.update({
            where: { id: accommodationId },
            data: { voteCount: { increment: 1 } },
        });

        return res.status(200).json({ message: "Successfully voted for accommodation" ,
            incrementCount
        });
    } catch (err) {
        console.error("Error in voteForAccommodation:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};




export const editTrip = (req: Request, res: Response) =>{
    try{

    }
    catch(err) {
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const getFinalTrip = (req: Request, res: Response) =>{
    try{

    }
    catch(err) {
        return res.status(500).json({message: "Internal Server Error"});
    }
}