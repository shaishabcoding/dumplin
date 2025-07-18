import { Types } from 'mongoose';
import { TCoordinates } from '../../../types/location';

export type TMessage = {
  _id?: Types.ObjectId;

  session_id: Types.ObjectId;
  user_message: string;
  bot_response: string;
  recommendations?: TRestaurant[];
  hasRecommendations?: boolean;

  createdAt?: Date;
  updatedAt?: Date;
};

export type TRestaurant = {
  name: string;
  cuisine: string;
  price_range: string;
  rating: number;
  phone: string;
  website: string;
  location: string;
  coordinates: TCoordinates;
};
