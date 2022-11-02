import { rest } from "msw";

const handlers = [
  rest.get("/players", (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        players: [{ id: 0, name: "Ter Stegen", role: "GK", team: "Barcelona" }],
      })
    );
  }),
];

export { handlers };
