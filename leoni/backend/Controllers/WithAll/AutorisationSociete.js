import prisma from "../../Utils/PrismaClient.js";
import { createError } from "../../Utils/Error.js";

export const AddSociete = async (req, res, next) => {
  try {
    const autorisation = await prisma.sortie_bien_societe.create({
      data: {
        quantite: req.body.quantite,
        destination: req.body.destination,
        tronsporteur: req.body.tronsporteur,
        type_sortie: req.body.type_sortie,
        num_mise_rebut: req.body.num_mise_rebut,
        date_sortie: new Date(req.body.date_sortie) || new Date().toISOString(),
        date_retour_prevue:
          new Date(req.body.date_retour_prevue) || new Date().toISOString(),
        responsable_retour: req.body.responsable_retour,
        nature_bien: req.body.nature_bien,
        etat: "En_attente",
        userId: req.user.id,
      },
    });

    if (autorisation) {
      res.status(200).send({ msg: "autorisation ajoutée avec succès" });
    } else {
      next(createError(404, "vous avez des informations incorrects"));
    }
  } catch (err) {
    next(err);
  }
};

export const GetMyAutorisation = async (req, res, next) => {
  try {
    const all = await prisma.sortie_bien_societe.findMany({
      where: {
        userId: req.user.id,
      },
    });
    res.status(200).send({ msg: all });
  } catch (err) {
    next(err);
  }
};
export const GetQuantity = async (req, res, next) => {
  try {
    const all = await prisma.sortie_bien_societe.findFirst({
      where: {
        userId: req.user.id,
        id: parseInt(req.params.id),
      },
    });
    res.status(200).send({ msg: all.quantite });
  } catch (err) {
    next(err);
  }
};
