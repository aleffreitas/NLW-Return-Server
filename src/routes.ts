// GET = Buscar informações
// POST = Cadastrar informações
// PUT = Atualizar informações de uma entidade
// PATCH = Atualizar uma informação única de uma entidade
// DELETE = Deletar informações

import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prismaFeedbacksRepository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router();

routes.post('/feedbacks', async (request, response) =>{
  const { type, comment, screenshot } = request.body;

  try{  
  const primaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    primaFeedbacksRepository,
    nodemailerMailAdapter,
  );
  
  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot
  });

  return response.status(201).send();
  }catch(error){
    console.log(error);

    return response.status(500).send();
  }
});