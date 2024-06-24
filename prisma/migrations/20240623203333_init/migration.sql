-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "birth" TEXT,
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
INSERT INTO "new_player" ("active", "affiliation", "birth", "college", "country", "firstname", "heightsInInches", "heightsInMeters", "id", "jersey", "lastname", "position", "start", "teamId", "weightInKilograms", "weightInPounds", "yearPro") SELECT "active", "affiliation", "birth", "college", "country", "firstname", "heightsInInches", "heightsInMeters", "id", "jersey", "lastname", "position", "start", "teamId", "weightInKilograms", "weightInPounds", "yearPro" FROM "player";
DROP TABLE "player";
ALTER TABLE "new_player" RENAME TO "player";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
