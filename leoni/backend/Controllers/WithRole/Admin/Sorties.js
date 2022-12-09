import prisma from "../../../Utils/PrismaClient.js";
export const AddTypeSortie = async (req, res, next) => {
  try {
    const type = await prisma.type_sortie.create({
      data: {
        TypeSortie: req.body.typesortie,
      },
    });
    if (type) {
      res.status(200).send({ msg: "type de sortie ajoutée avec succès" });
    }
  } catch (err) {
    next(err);
  }
};

export const DeleteTypeSortie = async (req, res, next) => {
  try {
    const deleted = await prisma.type_sortie.delete({
      where: {
        id: parseInt(req.params["id"]),
      },
    });
    if (deleted) {
      res.status(200).send({ msg: "type de sortie supprimée avec succès" });
    }
  } catch (err) {
    next(err);
  }
};

export const UpdateTypeSortie = async (req, res, next) => {
  try {
    const updated = await prisma.type_sortie.update({
      where: {
        id: parseInt(req.params["id"]),
      },
      data: {
        TypeSortie: req.body.typesortie,
      },
    });
    if (updated) {
      res.status(200).send({ msg: "type de sortie modifiée avec succès" });
    }
  } catch (err) {
    next(err);
  }
};
