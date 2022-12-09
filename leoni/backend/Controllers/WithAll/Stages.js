import prisma from "../../Utils/PrismaClient.js";
const GetTypeStage = async (req, res, next) => {
  try {
    const all = await prisma.type_stage.findMany();
    res.status(200).send({ msg: all });
  } catch (err) {
    next(err);
  }
};
export default GetTypeStage;
