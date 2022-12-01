import { rest } from "msw";

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
];

export { handlers };
