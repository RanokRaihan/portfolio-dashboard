export interface ISkill {
  _id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  proficiencyLevel: "beginner" | "intermediate" | "advanced" | "expert";
  yearsOfExperience: number;
  featured: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}
