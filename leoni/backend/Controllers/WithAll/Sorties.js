import prisma from "../../Utils/PrismaClient.js";
const GetTypeSortie = async (req, res, next) => {
  try {
    const all = await prisma.type_sortie.findMany();
    res.status(200).send({ msg: all });
  } catch (err) {
    next(err);
  }
};

export default GetTypeSortie;
