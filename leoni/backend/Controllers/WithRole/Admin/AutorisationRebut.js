import prisma from "../../../Utils/PrismaClient.js";
export const Getautorisations = async (req, res, next) => {
  try {
    const all = await prisma.rebut.findMany({
      where: {
        etat: req.query.status,
      },
    });
    res.status(200).send({ msg: all });
  } catch (err) {
    next(err);
  }
};
export const confirm_refus = async (req, res, next) => {
  try {
    const rebut = await prisma.rebut.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        etat: req.body.etat,
      },
    });
    if (rebut) {
      res.status(200).send({ msg: "autorisation modifiée avec succès" });
    }
  } catch (err) {
    next(err);
  }
};
