import { matchedData } from "express-validator";
import createHttpError from "http-errors";
import asyncWrapper from "../helpers/asyncWrapper";
import * as layoutService from "../services/layout.service";
import { ILayout } from "../types/layout.type";

export const patchLayout = asyncWrapper(async (req, res) => {
  const { style, defaultTheme, color } = matchedData(req) as ILayout;

  let layout = await layoutService.getByProperty("user", req.user.id);
  if (!layout) throw createHttpError(404, "Requested layout not found");

  if (style) layout.style = style;
  if (color) layout.color = color;
  if (defaultTheme) layout.defaultTheme = defaultTheme;

  // perform update task
  await layout.save();

  res.status(200).json({ result: layout.toObject() });
});

export const getLayout = asyncWrapper(async (req, res) => {
  let layout = await layoutService.getByProperty("user", req.user.id);
  // if layout does not exist then create it for user
  if (!layout) layout = await layoutService.create({ user: req.user.id });

  res.status(200).json({ result: layout.toObject() });
});
