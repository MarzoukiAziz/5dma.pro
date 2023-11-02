import { Job } from './Job';
import { User } from './User';

export class App {
  _id: string;
  date: Date;
  status: string;
  comment: string;
  job: Job;
  user: User;
}
