import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbackRepository } from "../feedbacksRepository";

export class PrismaFeedbacksRepository implements FeedbackRepository {
  async create({type, comment, screenshot}: FeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        type: type,
        comment: comment,
        screenshot: screenshot,
  
        //Variação short sintax.
        //Quando a chave tem o mesmo valor da propriedade, não é necessário colocar o nome da propriedade. Pode ser usado da maneira abaixo.
        // type,
        // comment,
        // screenshot,
      }
    });
  }
}