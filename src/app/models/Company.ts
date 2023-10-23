import { Types } from 'mongoose';

export class Company {
  _id: Types.ObjectId;
  name?: string;
  description?: string;
  location?: string;
  secteur?: string;
  type?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
  icon?: string;
  creationDate?: string;
  internationalPresence?: string;
}
