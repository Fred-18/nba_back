import { Team } from "../src/interface/teamInterface";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import { error } from "console";

const prisma = new PrismaClient();
config();

export async function fetchDataAndStoreTeams(): Promise<Team[] | undefined> {
  const teamsArray: Team[] = [];
  try {
    const apiKey: string | undefined = process.env.API_KEY;
    const apiHost: string | undefined = process.env.API_HOST;
    const apiUrl: string | undefined = process.env.API_URL;

    if (!apiKey) {
      throw new Error("API_KEY not found in .env");
    }
    if (!apiHost) {
      throw new Error("API_Host not found in .env");
    }

    const response = await axios.get(apiUrl + "/teams", {
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": apiHost
      }
    });

    const teamsResponse: Team[] = response.data.response;
    if (!teamsResponse) {
      throw error;
    } else {
      console.log(teamsResponse, "*** je fetch toutes les equipes");

      for (const team of teamsResponse) {
        if (!team.nbaFranchise || team.allstar) {
          continue;
        }

        const existingTeam = await prisma.team.findUnique({
          where: {
            id: team.id
          }
        });

        if (existingTeam) {
          // Mettre à jour l'équipe existante
          await prisma.team.update({
            where: {
              id: team.id
            },
            data: {
              name: team.name,
              nickname: team.nickname,
              code: team.code,
              city: team.city,
              logo: team.logo
            }
          });
        } else {
          // Créer une nouvelle équipe
          await prisma.team.create({
            data: {
              id: team.id,
              name: team.name,
              nickname: team.nickname,
              code: team.code,
              city: team.city,
              logo: team.logo
            }
          });
          teamsArray.push(team);
          console.log(teamsArray, "je verifie qui me renvoi bien un array ");
        }
      }
    }
    return teamsArray;
    console.log("Data has been successfully stored in the database.");
  } catch (error) {
    console.error("Prisma error", error);
    console.error("Error fetching data or storing it in the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

fetchDataAndStoreTeams();
/* Cible erreur  */
