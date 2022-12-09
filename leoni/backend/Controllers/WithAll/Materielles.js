import prisma from "../../Utils/PrismaClient.js";

export const AddMaterielle = async (req, res, next) => {
  try {
    const materielle = await prisma.materielles.create({
      data: {
        num_imm: req.body.num_imm,
        num_serie: req.body.num_serie,
        marque: req.body.marque,
        sortieId: parseInt(req.params.id),
      },
    });
    res.status(200).send({ msg: "matérielle ajoutée avec succès" });
  } catch (err) {
    next(err);
  }
};
export const CountMaterielle = async (req, res, next) => {
  try {
    const count = await prisma.materielles.count({
      where: {
        sortieId: parseInt(req.params.id),
      },
    });
    res.status(200).send({ msg: count });
  } catch (err) {
    next(err);
  }
};
export const GetMaterielles = async (req, res, next) => {
  try {
    const all = await prisma.materielles.findMany({
      where: {
        sortieId: parseInt(req.params.id),
      },
    });
    if (all) {
      res.status(200).send({ msg: all });
    }
  } catch (err) {
    next(err);
  }
};
