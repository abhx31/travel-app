import { Router } from 'express';
import { createActivity, createDestination, createExpense, createTrip } from '../controllers/trip.controllers';
import { authMiddleware } from '../middlewares/auth.middleware';

const tripRouter = Router();

tripRouter.post('/create', authMiddleware, createTrip);
tripRouter.post('/destination', authMiddleware, createDestination);
tripRouter.post('/accomodation', authMiddleware, createDestination);
tripRouter.post('/activity', authMiddleware, createActivity);
tripRouter.post('/expense', authMiddleware, createExpense)

export default tripRouter;