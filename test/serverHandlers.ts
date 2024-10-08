import { rest } from "msw";

import { LEAGUE_ID_LENGTH } from "../src/features/leagues/constants";

const handlers = [
  rest.get("/players/query", (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        players: [
          {
            id: 0,
            firstName: "Ter",
            lastName: "Stegen",
            role: "GK",
            team: "Barcelona",
          },
        ],
      })
    );
  }),
  rest.get("/league", (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        league: {
          id: "0".repeat(LEAGUE_ID_LENGTH),
          members: [
            {
              id: "id",
              username: "Signed In User",
              team: [
                {
                  id: 0,
                  firstName: "Ronald",
                  lastName: "Araujo",
                  role: "DEF",
                  team: "Barcelona",
                },
              ],
            },
            {
              id: "OTHER USER ID",
              username: "Other User",
              team: [
                {
                  id: 1,
                  firstName: "Lionel",
                  lastName: "Messi",
                  role: "ATT",
                  team: "Paris",
                },
              ],
            },
          ],
          name: "Some League",
        },
      })
    );
  }),
];

export { handlers };
