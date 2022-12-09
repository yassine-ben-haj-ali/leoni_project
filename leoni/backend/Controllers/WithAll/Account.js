import prisma from "../../Utils/PrismaClient.js";
import { createError } from "../../Utils/Error.js";

const ChangePassword = async (req, res, next) => {
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });
    const test = req.body.passnow === getUser.mdp;
    if (!test) {
      return next(createError(404, "mot de passe incorrect"));
    } else {
      const Update = await prisma.user.update({
        where: {
          id: req.user.id,
        },
        data: {
          mdp: req.body.newpass,
        },
      });
      res.status(200).send("mot de passe modifié");
    }
  } catch (err) {
    next(err);
  }
};

export default ChangePassword;
