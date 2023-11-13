export interface Experience {
  title: string;
  company: string;
  location?: string;
  monthStart: number;
  monthEnd: number;
  yearStart: number;
  yearEnd: number;
  role: string;
}

export interface Education {
  school: string;
  degree: string;
  field: string;
  yearStart: number;
  yearEnd: number;
}

export interface Skill {
  name: string;
}

export interface Language {
  title: string;
  level: string;
}

export class User {
  email: string = '';
  phone: string = '';
  password!: string;
  fname: string = '';
  lname: string = '';
  gender: string = '';
  country!: string;
  date!: Date;
  role!: string;
  profile?: string;
  experience: Experience[] = [];
  education: Education[] = [];
  skills: Skill[] = [];
  languages: Language[] = [];
}
