import asyncWrapper from "../helpers/asyncWrapper";

export const getHealth = asyncWrapper(async (_req, res) => {
  return res.sendStatus(200);
});
