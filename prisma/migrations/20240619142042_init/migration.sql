/*
  Warnings:

  - You are about to drop the column `height` on the `player` table. All the data in the column will be lost.
  - You are about to drop the column `nba` on the `player` table. All the data in the column will be lost.
  - You are about to drop the column `standard` on the `player` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `player` table. All the data in the column will be lost.
  - Added the required column `active` to the `player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `heightsInInches` to the `player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `heightsInMeters` to the `player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jersey` to the `player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weightInKilograms` to the `player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weightInPounds` to the `player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearPro` to the `player` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "birth" INTEGER,
    "country" TEXT NOT NULL,
    "start" INTEGER NOT NULL,
    "yearPro" INTEGER NOT NULL,
    "heightsInInches" INTEGER NOT NULL,
    "heightsInMeters" INTEGER NOT NULL,
    "weightInPounds" INTEGER NOT NULL,
    "weightInKilograms" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "college" TEXT NOT NULL,
    "jersey" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    "affiliation" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    CONSTRAINT "player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_player" ("affiliation", "birth", "college", "firstname", "id", "lastname", "teamId") SELECT "affiliation", "birth", "college", "firstname", "id", "lastname", "teamId" FROM "player";
DROP TABLE "player";
ALTER TABLE "new_player" RENAME TO "player";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
