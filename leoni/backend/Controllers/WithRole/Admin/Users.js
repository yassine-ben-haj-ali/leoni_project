import prisma from "../../../Utils/PrismaClient.js";

export const AddUser = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        matricule: req.body.matricule,
        email: req.body.email,
        nom: req.body.nom,
        prenom: req.body.prenom,
        mdp: req.body.password,
        Role: req.body.role,
        fonctionId: req.body.fonction,
        serviceId: req.body.service,
      },
    });
    if (user) {
      res.status(200).send({ msg: "utilisateur ajouté avec succès" });
    }
  } catch (err) {
    next(err);
  }
};

export const DeleteUser = async (req, res, next) => {
  try {
    const deleted = await prisma.user.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (deleted) {
      res.status(200).send({ msg: "utilisateur supprimé avec succès" });
    }
  } catch (err) {
    next(err);
  }
};

export const UpdateUser = async (req, res, next) => {
  try {
    const updated = await prisma.user.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        email: req.body.email,
        nom: req.body.nom,
        prenom: req.body.prenom,
        Role: req.body.role,
        fonctionId: req.body.fonction,
        serviceId: req.body.service,
      },
    });
    if (updated) {
      res.status(200).send({ msg: "utilisateur modifié avec succès" });
    }
  } catch (err) {
    next(err);
  }
};

export const GetUsers = async (req, res, next) => {
  try {
    const all = await prisma.user.findMany();
    res.status(200).send({ msg: all });
  } catch (err) {
    next(err);
  }
};
