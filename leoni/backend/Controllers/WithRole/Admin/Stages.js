import prisma from "../../../Utils/PrismaClient.js";
export const AddTypeStage = async (req, res, next) => {
  try {
    const type = await prisma.type_stage.create({
      data: {
        TypeStage: req.body.typestage,
      },
    });
    if (type) {
      res.status(200).send({ msg: "type de stage ajoutée avec succès" });
    }
  } catch (err) {
    next(err);
  }
};

export const DeleteTypeStage = async (req, res, next) => {
  try {
    const deleted = await prisma.type_stage.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.status(200).send({ msg: "type de stage supprimée avec succès" });
  } catch (err) {
    next(err);
  }
};

export const UpdateTypeStage = async (req, res, next) => {
  try {
    const updated = await prisma.type_stage.update({
      where: {
        id: parseInt(req.params["id"]),
      },
      data: {
        TypeStage: req.body.typestage,
      },
    });
    if (updated) {
      res.status(200).send({ msg: "type de stage modifiée  avec succès" });
    }
  } catch (err) {
    next(err);
  }
};
