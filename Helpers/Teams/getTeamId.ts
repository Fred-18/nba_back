import { error, log } from "console";
import { Team } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
dotenv.config();
const prisma = new PrismaClient();

export async function getTeamIds(): Promise<number[] | undefined> {
  try {
    const teams: Team[] | any = await prisma.team.findMany({
      select: {
        id: true
      }
    });
    if (!teams) {
      throw error;
    }
    const teamIdsArray: number[] = teams.map((team: { id: number }) => team.id);

    return teamIdsArray;
  } catch (error) {
    console.error("Prisma error", error);
    console.error("somethings goes wrong when we try to get teams ids");
    return [];
  } finally {
    await prisma.$disconnect();
  }
}
/* getTeamIds().then((teamIds) => {
  console.log("Returned Team IDs:", teamIds);
}); */
