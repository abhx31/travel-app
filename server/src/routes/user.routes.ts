import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { getTrip, joinTrip, voteForAccommodation, voteForDestination } from '../controllers/user.controllers';
const userRouter = Router();

userRouter.post('/join', authMiddleware, joinTrip);
userRouter.get('/', getTrip);
userRouter.post('/vote-destination', authMiddleware, voteForDestination);
userRouter.post('/vote-accomodation', authMiddleware, voteForAccommodation);

export default userRouter;