import { Request, Response } from "express";
import { AuthenticatedRequest } from "../utils/types";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const createTrip = async(req: AuthenticatedRequest, res: Response) =>{
    try{
        const {
            title,
            description,
            startDate,
            endDate,
            totalBudget,  
            hostId   
        } = req.body;
        
        const trip = await prisma.trip.create({
            data: {
                title,
                description,
                startDate: new Date(startDate), 
                endDate: new Date(endDate),     
                totalBudget,
                hostId: req.user!.id,
            },
        });
        
        return res.status(201).json({message: "Trip created successfully", trip})
    }
    catch(err) {
        console.error(err)
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const createDestination = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { tripId, placeName, country, description, estimatedCost, images } = req.body;

        const destination = await prisma.destination.create({
            data: {
                tripId,
                placeName,
                country,
                description,
                estimatedCost,
                images,
            },
        });

        return res.status(201).json({ message: "Destination created successfully", destination });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const createAccommodation = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { tripId, destinationId, name, type, pricePerNight, totalRooms, amenities, images, checkIn, checkOut } = req.body;

        const accommodation = await prisma.accommodation.create({
            data: {
                tripId,
                destinationId,
                name,
                type,
                pricePerNight,
                totalRooms,
                amenities,
                images,
                checkIn: new Date(checkIn),
                checkOut: new Date(checkOut),
            },
        });

        return res.status(201).json({ message: "Accommodation created successfully", accommodation });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const createActivity = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { tripId, destinationId, name, description, estimatedCost, plannedDate, durationMinutes, images } = req.body;

        const activity = await prisma.activity.create({
            data: {
                tripId,
                destinationId,
                name,
                description,
                estimatedCost,
                plannedDate: new Date(plannedDate),
                durationMinutes,
                images,
            },
        });

        return res.status(201).json({ message: "Activity created successfully", activity });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const createExpense = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { tripId, paidByUserId, category, amount, currency, description, splitAmong, expenseDate } = req.body;

        const expense = await prisma.expense.create({
            data: {
                tripId,
                category,
                amount,
                currency,
                description,
                expenseDate: new Date(expenseDate),
            },
        });

        return res.status(201).json({ message: "Expense created successfully", expense });
    } catch (err) {
        console.error(err);
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