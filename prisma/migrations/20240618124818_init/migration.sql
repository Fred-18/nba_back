/*
  Warnings:

  - You are about to drop the column `team` on the `player` table. All the data in the column will be lost.
  - Added the required column `affiliation` to the `player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `college` to the `player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamId` to the `player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `player` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "birth" INTEGER,
    "nba" INTEGER,
    "teamId" INTEGER NOT NULL,
    "height" INTEGER,
    "weight" INTEGER NOT NULL,
    "college" TEXT NOT NULL,
    "affiliation" TEXT NOT NULL,
    "standard" INTEGER,
    CONSTRAINT "player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_player" ("birth", "firstname", "id", "lastname", "nba") SELECT "birth", "firstname", "id", "lastname", "nba" FROM "player";
DROP TABLE "player";
ALTER TABLE "new_player" RENAME TO "player";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
