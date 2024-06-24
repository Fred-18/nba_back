import { Player } from "./../src/interface/playerInterface";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { error } from "console";
import { config } from "dotenv";

const prisma = new PrismaClient();
config();

export async function fetchPlayersAndStorePlayers(
  teamsId: number,
  seasons: string
): Promise<Player[] | undefined> {
  try {
    const apiKey = process.env.API_KEY;
    const apiHost = process.env.API_HOST;
    const urlPlayers = process.env.URL_PLAYERS;

    if (!apiKey || !apiHost || !urlPlayers) {
      throw new Error("API_KEY or API_HOST or URL_PLAYERS not found in .env");
    }
    const response = await axios.get(urlPlayers, {
      params: {
        team: teamsId,
        season: seasons
      },
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": apiHost
      }
    });

    const playersData = response.data.response;

    const players: Player[] = playersData.map((playerData: Player) =>
      transformPlayerData(playerData, teamsId)
    );
    await storePlayers(teamsId, players);

    return players;
  } catch (error) {
    console.error(`Error fetching players for Team ID ${teamsId}`);
    console.error("Prisma error", error);

    return undefined;
  } finally {
    await prisma.$disconnect;
  }
  function transformPlayerData(response: Player | any, teamId: number): Player {
    return {
      id: response.id,
      firstname: response.firstname,
      lastname: response.lastname,
      birth: response.birth.date,
      country: response.birth.country,
      start: response.nba.start,
      yearPro: response.nba.pro,
      heightsInInches: parseInt(response.height.inches),
      heightsInMeters: parseInt(response.height.meters),
      weightInPounds: parseInt(response.weight.pounds),
      weightInKilograms: parseInt(response.weight.kilograms),
      college: response.college,
      affiliation: response.affiliation,
      jersey: response.leagues.standard.jersey,
      active: response.leagues.standard.active,
      position: response.leagues.standard.pos,
      teamId: teamId
    };
  }

  async function storePlayers(
    teamId: number,
    players: Player[]
  ): Promise<void> {
    if (!teamId) {
      console.log("no id ***");
    }

    for (const player of players) {
      await prisma.player.upsert({
        where: { id: player.id },
        update: {
          firstname: player.firstname,
          lastname: player.lastname,
          birth: player.birth,
          country: player.country,
          start: player.start,
          yearPro: player.yearPro,
          heightsInInches: player.heightsInInches,
          heightsInMeters: player.heightsInMeters,
          weightInPounds: player.weightInPounds,
          weightInKilograms: player.weightInKilograms,
          college: player.college,
          affiliation: player.affiliation,
          jersey: player.jersey,
          active: player.active,
          position: player.position,
          teamId: player.teamId
        },

        create: {
          id: player.id,
          firstname: player.firstname,
          lastname: player.lastname,
          birth: player.birth,
          country: player.country,
          start: player.start,
          yearPro: player.yearPro,
          heightsInInches: player.heightsInInches,
          heightsInMeters: player.heightsInMeters,
          weightInPounds: player.weightInPounds,
          weightInKilograms: player.weightInKilograms,
          college: player.college,
          affiliation: player.affiliation,
          jersey: player.jersey,
          active: player.active,
          position: player.position,
          teamId: player.teamId
        }
      });
    }
  }
}
