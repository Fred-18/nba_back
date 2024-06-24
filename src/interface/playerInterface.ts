import { Team } from "@prisma/client";

export interface Player {
  teamId: number;
  id: number;
  firstname: string;
  lastname: string;
  birth: string;
  country: string;
  start: number;
  yearPro: number;
  heightsInInches: number;
  heightsInMeters: number;
  weightInPounds: number;
  weightInKilograms: number;
  college: string;
  affiliation: string;
  jersey: number;
  active: boolean;
  position: string;
}
