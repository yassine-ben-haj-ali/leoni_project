import prisma from "../../Utils/PrismaClient.js";
export const addRebut = async (req, res, next) => {
  try {
    const rebut = await prisma.rebut.create({
      data: {
        nature_investissement: req.body.nature_investissement,
        caracteristiques: req.body.caracteristiques,
        montant_acquisition: req.body.montant_acquisition,
        centre_cout: req.body.centre_cout,
        perte: req.body.perte,
        date_acquisition:
          new Date(req.body.date_acquisition) || new Date().toISOString(),
        date_sortie: new Date(req.body.date_sortie) || new Date().toISOString(),
        cause_rebut: req.body.cause_rebut,
        etat: "En_attente",
        userId: req.user.id,
      },
    });
    if (rebut) {
      res.status(200).send({ msg: "autorisation ajoutée avec succès" });
    }
  } catch (err) {
    next(err);
  }
};

export const GetmyRebut = async (req, res, next) => {
  try {
    const all = await prisma.rebut.findMany({
      where: {
        userId: req.user.id,
      },
    });
    res.status(200).send({ msg: all });
  } catch (err) {
    next(err);
  }
};
