import prisma from "../../../Utils/PrismaClient.js";
import { createError } from "../../../Utils/Error.js";

export const AddFunction = async (req, res, next) => {
  try {
    const func = await prisma.fonction.create({
      data: {
        designation: req.body.designation,
      },
    });
    res.status(200).send({ msg: "fonction ajoutée avec succès" });
  } catch (err) {
    next(createError(404, "fonction utilisée"));
  }
};

export const DeleteFunction = async (req, res, next) => {
  try {
    const deleted = await prisma.fonction.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (deleted) {
      res.status(200).send({ msg: "fonction supprimée avec succès" });
    }
  } catch (err) {
    next(err);
  }
};

export const UpdateFunction = async (req, res, next) => {
  try {
    const updated = await prisma.fonction.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        designation: req.body.designation,
      },
    });
    if (updated) {
      res.status(200).send({ msg: "fonction modifiée avec succès" });
    }
  } catch (err) {
    next(err);
  }
};

export const GetFunctions = async (req, res, next) => {
  try {
    const all = await prisma.fonction.findMany();
    res.status(200).send({ msg: all });
  } catch (err) {
    next(err);
  }
};
