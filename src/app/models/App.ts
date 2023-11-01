import { Types } from 'mongoose';
import { Job } from './Job';
import { User } from './User';

export class App {
  _id: string;
  date: Date;
  statut: string;
  comment: string;
  job: Job;
  user: User;
}
