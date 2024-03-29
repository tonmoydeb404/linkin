import { matchedData } from "express-validator";
import createHttpError from "http-errors";
import asyncWrapper from "../helpers/asyncWrapper";
import * as layoutService from "../services/layout.service";
import { ILayout, LayoutCreate } from "../types/layout.type";

export const patchLayout = asyncWrapper(async (req, res) => {
  const { style, theme, contentColor, primaryColor } = matchedData(
    req
  ) as ILayout;

  console.log(contentColor, primaryColor);

  let layout = await layoutService.getByProperty("user", req.user.id);
  if (!layout) throw createHttpError(404, "Requested layout not found");

  if (style) layout.style = style;
  if (theme) layout.theme = theme;
  if (primaryColor || primaryColor === null) layout.primaryColor = primaryColor;
  if (contentColor || contentColor === null) layout.contentColor = contentColor;

  // perform update task
  await layout.save();

  res.status(200).json({ result: layout.toObject() });
});

export const getLayout = asyncWrapper(async (req, res) => {
  let layout = await layoutService.getByProperty("user", req.user.id);
  // if layout does not exist then show error
  if (!layout) throw createHttpError(404, "User profile layout not found");

  res.status(200).json({ result: layout.toObject() });
});

export const postLayout = asyncWrapper(async (req, res) => {
  const { id } = req.user;
  const { contentColor, primaryColor, style, theme } = matchedData(
    req
  ) as LayoutCreate;

  let layout = await layoutService.getByProperty("user", id);

  if (layout) throw createHttpError(400, "Layout alreay exists");

  layout = await layoutService.create({
    contentColor,
    primaryColor,
    style,
    theme,
    user: id,
  });

  return res.status(200).json({ result: layout.toObject() });
});
