import prisma from "../../../Utils/PrismaClient.js";

export const AddService = async (req, res, next) => {
  try {
    const service = await prisma.service.create({
      data: {
        designation: req.body.designation,
        nbr_employee: req.body.nbr_employee,
      },
    });
    if (service) {
      res.status(200).send({ msg: "service ajouté avec succès" });
    }
  } catch (err) {
    next(err);
  }
};

export const DeleteService = async (req, res, next) => {
  try {
    const deleted = await prisma.service.delete({
      where: {
        id: parseInt(req.params["id"]),
      },
    });
    if (deleted) {
      res.status(200).send({ msg: "service supprimé avec succès" });
    }
  } catch (err) {
    next(err);
  }
};

export const UpdateService = async (req, res, next) => {
  try {
    const updated = await prisma.service.update({
      where: {
        id: parseInt(req.params["id"]),
      },
      data: {
        designation: req.body.designation,
        nbr_employee: req.body.nbr_employee,
      },
    });
    if (updated) {
      res.status(200).send({ msg: "service modifié avec succès" });
    }
  } catch (err) {
    next(err);
  }
};

export const GetServices = async (req, res, next) => {
  try {
    const all = await prisma.service.findMany();
    res.status(200).send({ msg: all });
  } catch (err) {
    next(err);
  }
};
