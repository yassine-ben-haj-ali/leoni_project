import { createError } from "../../Utils/Error.js";
import jwt from "jsonwebtoken";
import prisma from "../../Utils/PrismaClient.js";

const login = async (req, res, next) => {
  try {
    let user = await prisma.user.findUnique({
      where: {
        matricule: req.body.matricule,
      },
    });
    if (user) {
      const isValidPass = req.body.password === user.mdp;
      if (!isValidPass) {
        return next(createError(404, "mot de passe incorrect"));
      } else {
        let payload = {
          id: user.id,
          matricule: user.matricule,
          email: user.email,
          name: user.name,
          prenom: user.prenom,
          role: user.Role,
          fonction: user.fonctionId,
          service: user.serviceId,
        };
        const token = jwt.sign(payload, process.env.JWT);
        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json({ details: { ...payload } });
      }
    } else {
      return next(createError(404, "aucune utilisateur avec cette matricule"));
    }
  } catch (err) {
    next(err);
  }
};
export default login;
