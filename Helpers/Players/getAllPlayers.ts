import { fetchPlayersAndStorePlayers } from "../../FetchApi/fetchAndStorePlayer";
import { Player } from "./../../src/interface/playerInterface";
import { getTeamIds } from "../Teams/getTeamId";
import { error } from "console";
import { config } from "dotenv";
config();

export async function getAllPlayers(
  season: string
): Promise<Player[] | undefined> {
  try {
    const nbaPlayersArrary: Player[] = [];
    const teamIds: number[] | undefined = await getTeamIds();
    if (!teamIds) {
      throw error;
    }

    for (const teamId of teamIds) {
      console.log(teamId, "***");
      const players: Player[] | any = await fetchPlayersAndStorePlayers(
        teamId,
        "2023"
      );
      nbaPlayersArrary.push(...players);
    }
    return nbaPlayersArrary;
  } catch (error) {
    ("We have a error when we try to get players ");
  }
}

export const currentSeason = "2023";
getAllPlayers("2023");
