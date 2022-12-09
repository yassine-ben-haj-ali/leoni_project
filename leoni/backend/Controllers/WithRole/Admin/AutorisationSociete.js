import prisma from "../../../Utils/PrismaClient.js";

export const GetAutorisations = async (req, res, next) => {
  try {
    const all = await prisma.sortie_bien_societe.findMany({
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
    const biens = await prisma.sortie_bien_societe.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        etat: req.body.etat,
      },
    });
    if (biens) {
      res.status(200).send({ msg: "autorisation modifiée avec succès" });
    }
  } catch (err) {
    next(err);
  }
};
