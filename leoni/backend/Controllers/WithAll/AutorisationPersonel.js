import prisma from "../../Utils/PrismaClient.js";

export const AddPersonel = async (req, res, next) => {
  try {
    const biens = await prisma.sortie_bien_personel.create({
      data: {
        nature: req.body.nature,
        quantite: req.body.quantite,
        destination: req.body.destination,
        nom_tronsporteur: req.body.nom_tronsporteur,
        prenom_tronsporteur: req.body.prenom_tronsporteur,
        institue: req.body.institue,
        type_stage: req.body.type_stage,
        date_stage: new Date(req.body.date_stage) || new Date().toISOString(),
        date_debut: new Date(req.body.date_debut) || new Date().toISOString(),
        date_fin: new Date(req.body.date_fin) || new Date().toISOString(),
        userId: req.user.id,
        etat: "En_attente",
      },
    });
    if (biens) {
      res.status(200).send({ msg: "autorisation ajoutée avec succès" });
    }
  } catch (err) {
    next(err);
  }
};

export const GetmyPersonel = async (req, res, next) => {
  try {
    const all = await prisma.sortie_bien_personel.findMany({
      where: {
        userId: req.user.id,
      },
    });
    res.status(200).send({ msg: all });
  } catch (err) {
    next(err);
  }
};
