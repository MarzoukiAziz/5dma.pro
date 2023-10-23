import { Company } from './Company';

export class Job {
  _id: string;
  title: string;
  contract: string;
  location: string;
  date: Date;
  remote?: string;
  details: string;
  function: string;
  startingDate: string;
  deadline?: string;
  link: string;
  company: Company;
}
